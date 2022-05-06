<template>
    <a-descriptions title="报警详情" bordered>
        <a-descriptions-item label="名称" :span="3">
            Cloud Database
        </a-descriptions-item>

        <a-descriptions-item label="时间" :span="3">
            2022-04-24 18:00:00
        </a-descriptions-item>

        <a-descriptions-item label="级别" :span="2">
            <a-badge status="processing" text="warn" />
        </a-descriptions-item>
        <a-descriptions-item label="所属服务">
            <router-link to="/server/info" >服务1</router-link>
        </a-descriptions-item>
<!--        <a-descriptions-item label="Discount">-->
<!--            $20.00-->
<!--        </a-descriptions-item>-->
<!--        <a-descriptions-item label="Official Receipts">-->
<!--            $60.00-->
<!--        </a-descriptions-item>-->
        <a-descriptions-item label="详细内容">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
        </a-descriptions-item>
    </a-descriptions>
</template>
