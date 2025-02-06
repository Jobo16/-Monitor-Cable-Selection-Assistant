// 获取页面元素
const resolutionSelect = document.getElementById('resolution');
const refreshRateSelect = document.getElementById('refreshRate');
const customResolutionDiv = document.getElementById('customResolution');
const customRefreshDiv = document.getElementById('customRefresh');
const customWidth = document.getElementById('customWidth');
const customHeight = document.getElementById('customHeight');
const customRefreshRate = document.getElementById('customRefreshRate');
const dpResult = document.querySelector('#dp-result span');
const hdmiResult = document.querySelector('#hdmi-result span');
const usb4Result = document.querySelector('#usb4-result span');
const thunderboltResult = document.querySelector('#thunderbolt-result span');

// 监听选择变化
resolutionSelect.addEventListener('change', handleResolutionChange);
refreshRateSelect.addEventListener('change', handleRefreshRateChange);
customWidth.addEventListener('input', updateRecommendation);
customHeight.addEventListener('input', updateRecommendation);
customRefreshRate.addEventListener('input', updateRecommendation);

// 处理分辨率选择变化
function handleResolutionChange() {
    if (resolutionSelect.value === 'custom') {
        customResolutionDiv.style.display = 'block';
    } else {
        customResolutionDiv.style.display = 'none';
    }
    updateRecommendation();
}

// 处理刷新率选择变化
function handleRefreshRateChange() {
    if (refreshRateSelect.value === 'custom') {
        customRefreshDiv.style.display = 'block';
    } else {
        customRefreshDiv.style.display = 'none';
    }
    updateRecommendation();
}

// 获取当前分辨率
function getCurrentResolution() {
    if (resolutionSelect.value === 'custom') {
        const width = parseInt(customWidth.value) || 0;
        const height = parseInt(customHeight.value) || 0;
        return [width, height];
    }
    return resolutionSelect.value.split('x').map(Number);
}

// 获取当前刷新率
function getCurrentRefreshRate() {
    if (refreshRateSelect.value === 'custom') {
        return parseInt(customRefreshRate.value) || 0;
    }
    return Number(refreshRateSelect.value);
}

// 验证输入值是否有效
function isValidInput() {
    const [width, height] = getCurrentResolution();
    const refreshRate = getCurrentRefreshRate();
    
    return width > 0 && height > 0 && refreshRate > 0;
}

// 计算并更新推荐
function updateRecommendation() {
    if (!isValidInput()) {
        dpResult.textContent = "请输入有效的参数";
        hdmiResult.textContent = "请输入有效的参数";
        usb4Result.textContent = "请输入有效的参数";
        thunderboltResult.textContent = "请输入有效的参数";
        return;
    }

    // 获取当前值
    const [width, height] = getCurrentResolution();
    const refreshRate = getCurrentRefreshRate();
    
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

    // 确定USB4版本
    let usb4Version;
    if (bandwidthGbps <= 20) {
        usb4Version = "USB4 20Gbps";
    } else if (bandwidthGbps <= 40) {
        usb4Version = "USB4 40Gbps";
    } else {
        usb4Version = "超出USB4带宽限制";
    }

    // 确定雷电版本
    let thunderboltVersion;
    if (bandwidthGbps <= 20) {
        thunderboltVersion = "雷电3（20Gbps模式）";
    } else if (bandwidthGbps <= 40) {
        thunderboltVersion = "雷电3/4（40Gbps）";
    } else {
        thunderboltVersion = "超出雷电接口带宽限制";
    }
    
    // 更新显示
    dpResult.textContent = dpVersion;
    hdmiResult.textContent = hdmiVersion;
    usb4Result.textContent = usb4Version;
    thunderboltResult.textContent = thunderboltVersion;
}

// 初始化显示
updateRecommendation();
