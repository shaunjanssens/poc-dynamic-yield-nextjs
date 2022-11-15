/**
 * Run benchmark between different versions
 *
 * Installation
 * https://k6.io/docs/get-started/installation/
 *
 * Run
 * k6 run loadtest.js
 */
import http from 'k6/http'
import {check, group} from 'k6'
import {Trend} from 'k6/metrics'

let StaticCampaignTrend = new Trend('Get Static Campaign', true)
let DynamicCampaignTrend = new Trend('Get Dynamic Campaign', true)

export let options = {
    vus: 5,
    duration: '15s',
}

const baseUrl = `https://poc-dynamic-yield-nextjs-middleware.vercel.app`
const endpoints = {
    staticCampaign: `${baseUrl}/static-campaign`,
    dynamicCampaign: `${baseUrl}/dynamic-campaign`,
}

export default function () {
    group('Static campaign', function () {
        let getResponse = http.get(endpoints.staticCampaign)
        check(getResponse, {'status was 200 (static campaign)': (r) => r.status === 200})
        StaticCampaignTrend.add(getResponse.timings.duration)
    })
    group('Dynamic campaign', function () {
        let getResponse = http.get(endpoints.dynamicCampaign)
        check(getResponse, {'status was 200 (dynamic campaign)': (r) => r.status === 200})
        DynamicCampaignTrend.add(getResponse.timings.duration)
    })
}