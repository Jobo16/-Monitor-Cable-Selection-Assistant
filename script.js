// 获取页面元素
const resolutionSelect = document.getElementById('resolution');
const refreshRateSelect = document.getElementById('refreshRate');
const dpResult = document.querySelector('#dp-result span');
const hdmiResult = document.querySelector('#hdmi-result span');

// 监听选择变化
resolutionSelect.addEventListener('change', updateRecommendation);
refreshRateSelect.addEventListener('change', updateRecommendation);

// 计算并更新推荐
function updateRecommendation() {
    // 获取选择的值
    const [width, height] = resolutionSelect.value.split('x').map(Number);
    const refreshRate = Number(refreshRateSelect.value);
    
    // 计算所需带宽（Gbps）
    // 公式：分辨率 × 刷新率 × 24位色深 / (1024 × 1024 × 1024) × 1.2（开销）
    const bandwidthGbps = (width * height * refreshRate * 24 / (1024 * 1024 * 1024)) * 1.2;
    
    // 确定DP版本
    let dpVersion;
    if (bandwidthGbps <= 10.8) {
        dpVersion = "DP 1.2";
    } else if (bandwidthGbps <= 25.92) {
        dpVersion = "DP 1.4";
    } else if (bandwidthGbps <= 77.37) {
        dpVersion = "DP 2.0";
    } else {
        dpVersion = "需要更高版本的DP接口";
    }
    
    // 确定HDMI版本
    let hdmiVersion;
    if (bandwidthGbps <= 4.95) {
        hdmiVersion = "HDMI 1.4";
    } else if (bandwidthGbps <= 14.4) {
        hdmiVersion = "HDMI 2.0";
    } else if (bandwidthGbps <= 42.6) {
        hdmiVersion = "HDMI 2.1";
    } else {
        hdmiVersion = "需要更高版本的HDMI接口";
    }
    
    // 更新显示
    dpResult.textContent = dpVersion;
    hdmiResult.textContent = hdmiVersion;
}

// 初始化显示
updateRecommendation();
