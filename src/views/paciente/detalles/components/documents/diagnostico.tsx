import { defineComponent } from "vue";
import Vue3Html2pdf from "vue3-html2pdf";
import { ref } from "vue";
import { html } from "pinyin-pro";
const html2Pdf = ref(null);
function exportPDF() {
  html2Pdf.value.generatePdf();
}

const Parent = defineComponent({
  name: "Parent",
  setup(_, { slots }) {
    return () => (
      <div>
            <el-button>sadasd</el-button>
            <vue3-html2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="false"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              filename="hee hee"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="landscape"
              pdf-content-width="800px"
              ref="html2Pdf"
            >
              <section slot="pdf-content">
                <!-- PDF Content Here -->
              </section>
            </vue3-html2pdf>
      </div>
    );
  }
});



export { Parent, exportPDF };
