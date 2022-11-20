import '../styles/globals.css'

const getMetricName = (name) => {
    switch (name) {
        case 'TTFB':
            return 'Time to First Byte';
        case 'FCP':
            return 'First Contentful Paint';
        case 'LCP':
            return 'Largest Contentful Paint';
        case 'FID':
            return 'First Input Delay';
        case 'CLS':
            return 'Cumulative Layout Shift';
        case 'INP':
            return 'Interaction to Next Paint';
        default:
            return name;
    }
}

export function reportWebVitals(metric) {
    console.log(`Performance: ${getMetricName(metric.name)} took ${(metric.value / 1000).toFixed(4)} seconds`)
}

function MyApp({Component, pageProps}) {
    return <Component {...pageProps} />
}

export default MyApp
