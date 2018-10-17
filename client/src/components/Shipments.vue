<template>
  <div class="shipments">
    <h1>shipments</h1>
    <div v-if="shipments.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>id</td>
          <td>Courier</td>
          <td>Status</td>
          <td >Description</td>
          <td >Driver Name</td>
          <td>Drivder comment</td>
        </tr>
        <tr v-for="shipment in shipments" :key="shipment.id">
          <td>{{ shipment.id }}</td>
          <td>{{ shipment.courier }}</td>
          <td>{{shipment.shipment_status}}</td>
          <td>{{ shipment.description }}</td>
          <td>{{ shipment.driver_name }}</td>
          <td>{{ shipment.driver_comment }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no shipments.. Lets add one now <br /><br />
    </div>
  </div>
</template>

<script>
import ShipmentService from "@/service/ShipmentService";

export default {
  name: "shipments",
  data() {
    return {
      shipments: []
    };
  },
  mounted() {
    this.fetchShipments();
  },
  methods: {
    async fetchShipments() {
      const response = await ShipmentService.getShipments();
      this.shipments = response.data;
    }
  }
};
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th,
table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
