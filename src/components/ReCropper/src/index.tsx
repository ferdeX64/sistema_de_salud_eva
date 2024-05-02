import "./circled.css";
import Cropper from "cropperjs";
import { ElUpload } from "element-plus";
import type { CSSProperties } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { longpress } from "@/directives/longpress";
import { useTippy, directive as tippy } from "vue-tippy";
import { delay, debounce, isArray, downloadByBase64 } from "@pureadmin/utils";
import {
  ref,
  unref,
  computed,
  PropType,
  onMounted,
  onUnmounted,
  defineComponent
} from "vue";
import {
  Reload,
  Upload,
  ArrowH,
  ArrowV,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ChangeIcon,
  ArrowRight,
  RotateLeft,
  SearchPlus,
  RotateRight,
  SearchMinus,
  DownloadIcon
} from "./svg";

type Options = Cropper.Options;

const defaultOptions: Options = {
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true
};

const props = {
  src: { type: String, required: true },
  alt: { type: String },
  circled: { type: Boolean, default: false },
  realTimePreview: { type: Boolean, default: true },
  height: { type: [String, Number], default: "360px" },
  crossorigin: {
    type: String as PropType<"" | "anonymous" | "use-credentials" | undefined>,
    default: undefined
  },
  imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  options: { type: Object as PropType<Options>, default: () => ({}) }
};

export default defineComponent({
  name: "ReCropper",
  props,
  setup(props, { attrs, emit }) {
    const tippyElRef = ref<ElRef<HTMLImageElement>>();
    const imgElRef = ref<ElRef<HTMLImageElement>>();
    const cropper = ref<Nullable<Cropper>>();
    const isReady = ref(false);
    const imgBase64 = ref();
    const inCircled = ref(props.circled);
    const inSrc = ref(props.src);
    let scaleX = 1;
    let scaleY = 1;

    const debounceRealTimeCroppered = debounce(realTimeCroppered, 80);

    const getImageStyle = computed((): CSSProperties => {
      return {
        height: props.height,
        maxWidth: "100%",
        ...props.imageStyle
      };
    });

    const getClass = computed(() => {
      return [
        attrs.class,
        {
          ["re-circled"]: inCircled.value
        }
      ];
    });

    const iconClass = computed(() => {
      return [
        "p-[6px]",
        "h-[30px]",
        "w-[30px]",
        "outline-none",
        "rounded-[4px]",
        "cursor-pointer",
        "hover:bg-[rgba(0,0,0,0.06)]"
      ];
    });

    const getWrapperStyle = computed((): CSSProperties => {
      return { height: `${props.height}`.replace(/px/, "") + "px" };
    });

    onMounted(init);

    onUnmounted(() => {
      cropper.value?.destroy();
    });

    useResizeObserver(tippyElRef, () => {
      handCropper("reset");
    });

    async function init() {
      const imgEl = unref(imgElRef);
      if (!imgEl) return;
      cropper.value = new Cropper(imgEl, {
        ...defaultOptions,
        ready: () => {
          isReady.value = true;
          realTimeCroppered();
          delay(400).then(() => emit("readied", cropper.value));
        },
        crop() {
          debounceRealTimeCroppered();
        },
        zoom() {
          debounceRealTimeCroppered();
        },
        cropmove() {
          debounceRealTimeCroppered();
        },
        ...props.options
      });
    }

    function realTimeCroppered() {
      props.realTimePreview && croppered();
    }

    function croppered() {
      if (!cropper.value) return;
      const canvas = inCircled.value
        ? getRoundedCanvas()
        : cropper.value.getCroppedCanvas();
      // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob
      canvas.toBlob(blob => {
        if (!blob) return;
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onloadend = e => {
          if (!e.target?.result || !blob) return;
          imgBase64.value = e.target.result;
          emit("cropper", {
            base64: e.target.result,
            blob,
            info: { size: blob.size, ...cropper.value.getData() }
          });
        };
        fileReader.onerror = () => {
          emit("error");
        };
      });
    }

    function getRoundedCanvas() {
      const sourceCanvas = cropper.value!.getCroppedCanvas();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      const width = sourceCanvas.width;
      const height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();
      return canvas;
    }

    function handCropper(event: string, arg?: number | Array<number>) {
      if (event === "scaleX") {
        scaleX = arg = scaleX === -1 ? 1 : -1;
      }
      if (event === "scaleY") {
        scaleY = arg = scaleY === -1 ? 1 : -1;
      }
      arg && isArray(arg)
        ? cropper.value?.[event]?.(...arg)
        : cropper.value?.[event]?.(arg);
    }

    function beforeUpload(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      inSrc.value = "";
      reader.onload = e => {
        inSrc.value = e.target?.result as string;
      };
      reader.onloadend = () => {
        init();
      };
      return false;
    }

    const menuContent = defineComponent({
      directives: {
        tippy,
        longpress
      },
      setup() {
        return () => (
          <div class="flex flex-wrap w-[60px] justify-between">
            <ElUpload
              accept="image/*"
              show-file-list={false}
              before-upload={beforeUpload}
            >
              <Upload
                class={iconClass.value}
                v-tippy={{
                  content: "cargar",
                  placement: "left-start"
                }}
              />
            </ElUpload>
            <DownloadIcon
              class={iconClass.value}
              v-tippy={{
                content: "descargando",
                placement: "right-start"
              }}
              onClick={() => downloadByBase64(imgBase64.value, "cropping.png")}
            />
            <ChangeIcon
              class={iconClass.value}
              v-tippy={{
                content: "Recorte de círculos y rectángulos",
                placement: "left-start"
              }}
              onClick={() => {
                inCircled.value = !inCircled.value;
                realTimeCroppered();
              }}
            />
            <Reload
              class={iconClass.value}
              v-tippy={{
                content: "Deshacer cambios",
                placement: "right-start"
              }}
              onClick={() => handCropper("reset")}
            />
            <ArrowUp
              class={iconClass.value}
              v-tippy={{
                content: "Subir (puede pulsarse prolongadamente)",
                placement: "left-start"
              }}
              v-longpress={[() => handCropper("move", [0, -10]), "0:100"]}
            />
            <ArrowDown
              class={iconClass.value}
              v-tippy={{
                content: "Desplazarse hacia abajo (puede pulsarse prolongadamente)",
                placement: "right-start"
              }}
              v-longpress={[() => handCropper("move", [0, 10]), "0:100"]}
            />
            <ArrowLeft
              class={iconClass.value}
              v-tippy={{
                content: "Mayúsculas a la izquierda (pulsación larga posible)",
                placement: "left-start"
              }}
              v-longpress={[() => handCropper("move", [-10, 0]), "0:100"]}
            />
            <ArrowRight
              class={iconClass.value}
              v-tippy={{
                content: "Mover a la derecha (puede pulsarse prolongadamente)",
                placement: "right-start"
              }}
              v-longpress={[() => handCropper("move", [10, 0]), "0:100"]}
            />
            <ArrowH
              class={iconClass.value}
              v-tippy={{
                content: "Volteo horizontal",
                placement: "left-start"
              }}
              onClick={() => handCropper("scaleX", -1)}
            />
            <ArrowV
              class={iconClass.value}
              v-tippy={{
                content: "volteo vertical",
                placement: "right-start"
              }}
              onClick={() => handCropper("scaleY", -1)}
            />
            <RotateLeft
              class={iconClass.value}
              v-tippy={{
                content: "girar en sentido antihorario",
                placement: "left-start"
              }}
              onClick={() => handCropper("rotate", -45)}
            />
            <RotateRight
              class={iconClass.value}
              v-tippy={{
                content: "girar en el sentido de las agujas del reloj",
                placement: "right-start"
              }}
              onClick={() => handCropper("rotate", 45)}
            />
            <SearchPlus
              class={iconClass.value}
              v-tippy={{
                content: "Acercar (pulsación larga posible)",
                placement: "left-start"
              }}
              v-longpress={[() => handCropper("zoom", 0.1), "0:100"]}
            />
            <SearchMinus
              class={iconClass.value}
              v-tippy={{
                content: "Acercar (pulsación larga)",
                placement: "right-start"
              }}
              v-longpress={[() => handCropper("zoom", -0.1), "0:100"]}
            />
          </div>
        );
      }
    });

    function onContextmenu(event) {
      event.preventDefault();

      const { show, setProps } = useTippy(tippyElRef, {
        content: menuContent,
        arrow: false,
        theme: "light",
        trigger: "manual",
        interactive: true,
        appendTo: "parent",
        // hideOnClick: false,
        animation: "perspective",
        placement: "bottom-end"
      });

      setProps({
        getReferenceClientRect: () => ({
          width: 0,
          height: 0,
          top: event.clientY,
          bottom: event.clientY,
          left: event.clientX,
          right: event.clientX
        })
      });

      show();
    }

    return {
      inSrc,
      props,
      imgElRef,
      tippyElRef,
      getClass,
      getWrapperStyle,
      getImageStyle,
      isReady,
      croppered,
      onContextmenu
    };
  },

  render() {
    const {
      inSrc,
      isReady,
      getClass,
      getImageStyle,
      onContextmenu,
      getWrapperStyle
    } = this;
    const { alt, crossorigin } = this.props;

    return inSrc ? (
      <div
        ref="tippyElRef"
        class={getClass}
        style={getWrapperStyle}
        onContextmenu={event => onContextmenu(event)}
      >
        <img
          v-show={isReady}
          ref="imgElRef"
          style={getImageStyle}
          src={inSrc}
          alt={alt}
          crossorigin={crossorigin}
        />
      </div>
    ) : null;
  }
});