import dayjs from "dayjs";

import { clone } from "@pureadmin/utils";

const date = dayjs(new Date()).format("YYYY-MM-DD");

const tableData = [
  {
   
    med: "Decortan",
    cant: "2900"
  },
  {
    med: "Merlix",
    cant: "2800"
  },
  {
    med: "Dolo",
    cant: "2700"
  },
  {
    med: "Flukit",
    cant: "2600"
  },
  {
    med: "Espasmo",
    cant: "2500"
  },
  {
    med: "Azitromicina",
    cant: "2400"
  },
  {
    med: "Profinal flas",
    cant: "1000"
  },
  {
    med: "Dexametasona",
    cant: "500"
  },
];

const cloneData = clone(tableData, true);

const tableDataMore = cloneData.map(item =>
  Object.assign(item, {
    state: "California",
    city: "Los Angeles",
    "post-code": "CA 90036"
  })
);

const tableDataImage = cloneData.map((item, index) =>
  Object.assign(item, {
    image: `https://pure-admin.github.io/pure-admin-table/imgs/${index + 1}.jpg`
  })
);

const tableDataSortable = cloneData.map((item, index) =>
  Object.assign(item, {
    date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
  })
);

const tableDataExpand = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "San Francisco",
    address: "3650 21st St, San Francisco",
    zip: "CA 94114",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114"
      }
    ]
  }
];

export {
  tableData,
  tableDataExpand,
  tableDataImage,
  tableDataMore,
  tableDataSortable
};
