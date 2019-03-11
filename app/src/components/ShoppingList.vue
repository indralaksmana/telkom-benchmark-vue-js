<template>
    <div>
        <h2 class="page-title">My Shopping</h2>
        <tabs>
            <tab name="Waiting Payment">
                <p class="message"><i class="fa fa-cloud"></i> There is not waiting payment for you.</p>
            </tab>
            <tab name="Waiting Shipment">
                <p class="message"><i class="fa fa-cloud"></i> There is not waiting shipment for you.</p>
            </tab>
            <tab name="Waiting Pickup">
                <p class="message"><i class="fa fa-cloud"></i> There is not waiting pickup for you.</p>
            </tab>
            <tab name="Done">
                <p class="message"><i class="fa fa-cloud"></i> There is not transaction history in your account.</p>
            </tab>
            <tab name="Canceled">
                <p class="message"><i class="fa fa-cloud"></i> There is not canceled item in your account.</p>
            </tab>
        </tabs>
    </div>
</template>

<script>
    export default {
        name: "ShoppingList"
    }
</script>

<style scoped>
    .page-title{
        font-size: 20px;
        margin-top: 0;
        margin-bottom: 20px;
    }
    .message{
        font-size: 16px;
    }
</style>