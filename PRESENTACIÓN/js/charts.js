/**
 * IQSTACK Presentation Charts & Interactive Simulator Component
 * Strictly separates chart rendering logic and mathematical simulations from presentation UI.
 */

const IQSTACK_CHARTS = {
  // --- CO2 SIMULATOR LOGIC ---
  calculateSavings(visitors) {
    // Constants for calculation
    // Traditional server average emission per pageview: ~0.5g CO2 (standard energy mix)
    // IQSTACK solar server emission: ~0.02g CO2 (only battery lifecycle / hardware fabrication amortization)
    const traditionalCO2g = 0.5;
    const iqstackCO2g = 0.02;
    
    const pageviews = visitors * 1.5; // Assume 1.5 pageviews per visitor average
    const traditionalTotalKg = (pageviews * traditionalCO2g) / 1000;
    const iqstackTotalKg = (pageviews * iqstackCO2g) / 1000;
    const savedKg = traditionalTotalKg - iqstackTotalKg;
    
    // Average mature tree absorbs ~22kg of CO2 per year (~1.83kg per month)
    const treeEquivalent = savedKg / 1.83;
    
    // Energy saved: traditional servers use ~0.005 kWh per pageview
    // IQSTACK solar uses optimized caches and low consumption: ~0.002 kWh solar
    const energySavedKwh = pageviews * 0.003; 

    return {
      traditionalKg: traditionalTotalKg.toFixed(1),
      iqstackKg: iqstackTotalKg.toFixed(1),
      savedKg: savedKg.toFixed(1),
      trees: Math.max(1, Math.round(treeEquivalent)),
      energyKwh: energySavedKwh.toFixed(1)
    };
  },

  animateValue(elementId, start, end, duration, suffix = "") {
    const obj = document.getElementById(elementId);
    if (!obj) return;
    
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (range === 0 ? 1 : Math.abs(range))));
    
    // For large numbers, step faster
    const startTime = performance.now();
    
    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const val = start + range * progress;
      
      if (Number.isInteger(end)) {
        obj.textContent = Math.round(val).toLocaleString('es-ES') + suffix;
      } else {
        obj.textContent = val.toFixed(1).toLocaleString('es-ES') + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  },

  updateSimulatorUI(visitorsValue) {
    const data = this.calculateSavings(visitorsValue);
    
    // Direct DOM text updates with micro-animations
    const savedValEl = document.getElementById("sim-saved-co2");
    const treesValEl = document.getElementById("sim-trees");
    const energyValEl = document.getElementById("sim-energy");
    
    const prevSaved = parseFloat(savedValEl?.textContent || "0");
    const prevTrees = parseInt(treesValEl?.textContent || "0");
    const prevEnergy = parseFloat(energyValEl?.textContent || "0");
    
    this.animateValue("sim-saved-co2", prevSaved, parseFloat(data.savedKg), 300, " kg");
    this.animateValue("sim-trees", prevTrees, data.trees, 300, " 🌳");
    this.animateValue("sim-energy", prevEnergy, parseFloat(data.energyKwh), 300, " kWh");

    // Animate visual growth indicator (a tree size scale)
    const ecoVisual = document.getElementById("sim-eco-visual");
    if (ecoVisual) {
      const scale = 0.5 + Math.min((data.trees / 80), 1.5);
      ecoVisual.style.transform = `scale(${scale})`;
      
      // Update glow intensity based on savings
      const glow = Math.min((parseFloat(data.savedKg) * 2), 40);
      ecoVisual.style.filter = `drop-shadow(0 0 ${glow}px rgba(16, 185, 129, 0.6))`;
    }
  },

  // --- FINANCIAL DOUGHNUT CHART (SVG) ---
  renderBudgetPie(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const data = IQSTACK_DATA.slides.find(s => s.id === "slide-8").finances.distribution;
    let accumulatedAngle = 0;
    
    // Draw SVG
    let svgContent = `
      <svg viewBox="0 0 400 400" class="pie-chart-svg" style="width: 100%; height: 100%;">
        <defs>
          <radialGradient id="cardGlow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stop-color="rgba(11, 15, 25, 1)" />
            <stop offset="100%" stop-color="rgba(21, 29, 48, 0)" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#cardGlow)" opacity="0.3"/>
    `;
    
    data.forEach((slice, idx) => {
      const percentage = slice.percentage;
      const angle = (percentage / 100) * 360;
      
      // Arc coordinates
      const startAngle = accumulatedAngle;
      const endAngle = accumulatedAngle + angle;
      
      const x1 = 200 + 130 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 200 + 130 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 200 + 130 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 200 + 130 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      // Create slice path (doughnut style)
      // Radius inner = 80, Radius outer = 130
      const innerX1 = 200 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
      const innerY1 = 200 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
      const innerX2 = 200 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
      const innerY2 = 200 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const d = `
        M ${x1} ${y1}
        A 130 130 0 ${largeArc} 1 ${x2} ${y2}
        L ${innerX2} ${innerY2}
        A 80 80 0 ${largeArc} 0 ${innerX1} ${innerY1}
        Z
      `;
      
      svgContent += `
        <path d="${d}" 
              fill="${slice.color}" 
              stroke="#0B0F19" 
              stroke-width="3"
              class="chart-slice" 
              data-name="${slice.name}" 
              data-percent="${slice.percentage}%" 
              data-amount="${slice.amount}€"
              style="transition: all 0.3s ease; cursor: pointer; transform-origin: 200px 200px;"
              onmouseover="IQSTACK_CHARTS.onPieHover(this, true)"
              onmouseout="IQSTACK_CHARTS.onPieHover(this, false)">
        </path>
      `;
      
      accumulatedAngle += angle;
    });
    
    // Add center labels placeholder
    svgContent += `
        <circle cx="200" cy="200" r="75" fill="#151D30" stroke="#1E293B" stroke-width="1"></circle>
        <text id="pie-label-name" x="200" y="190" text-anchor="middle" fill="#9CA3AF" font-family="var(--font-title)" font-size="14">Inversión Inicial</text>
        <text id="pie-label-val" x="200" y="220" text-anchor="middle" fill="#F3F4F6" font-family="var(--font-title)" font-size="24" font-weight="bold">4.000 €</text>
      </svg>
    `;
    
    container.innerHTML = svgContent;
  },

  onPieHover(element, isHover) {
    const labelName = document.getElementById("pie-label-name");
    const labelVal = document.getElementById("pie-label-val");
    
    if (isHover) {
      element.style.transform = "scale(1.05)";
      element.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.2))";
      if (labelName && labelVal) {
        labelName.textContent = element.getAttribute("data-name");
        labelVal.textContent = `${element.getAttribute("data-amount")} (${element.getAttribute("data-percent")})`;
        labelVal.setAttribute("fill", element.getAttribute("fill"));
      }
    } else {
      element.style.transform = "scale(1.0)";
      element.style.filter = "none";
      if (labelName && labelVal) {
        labelName.textContent = "Inversión Inicial";
        labelVal.textContent = "4.000 €";
        labelVal.setAttribute("fill", "#F3F4F6");
      }
    }
  },

  // --- BREAK-EVEN LINE CHART (SVG) ---
  renderBreakEven(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const finances = IQSTACK_DATA.slides.find(s => s.id === "slide-8").finances;
    const rawData = finances.breakEvenData;
    
    // Dimensions
    const width = 600;
    const height = 300;
    const paddingLeft = 60;
    const paddingRight = 30;
    const paddingTop = 40;
    const paddingBottom = 40;
    
    // Scales
    const maxVal = 75000; // max cumulated
    const minVal = -3000;
    const range = maxVal - minVal;
    
    const getX = (index) => {
      const step = (width - paddingLeft - paddingRight) / (rawData.length - 1);
      return paddingLeft + index * step;
    };
    
    const getY = (val) => {
      const innerHeight = height - paddingTop - paddingBottom;
      const pct = (val - minVal) / range;
      // SVG Y starts from top
      return height - paddingBottom - (pct * innerHeight);
    };

    // Build grid lines
    let gridLines = "";
    // Zero line
    const zeroY = getY(0);
    gridLines += `<line x1="${paddingLeft}" y1="${zeroY}" x2="${width - paddingRight}" y2="${zeroY}" stroke="#1E293B" stroke-dasharray="4" stroke-width="2"></line>`;
    gridLines += `<text x="${paddingLeft - 10}" y="${zeroY + 4}" text-anchor="end" fill="#4B5563" font-size="10">0€</text>`;
    
    // Max line
    const maxYVal = getY(maxVal);
    gridLines += `<line x1="${paddingLeft}" y1="${maxYVal}" x2="${width - paddingRight}" y2="${maxYVal}" stroke="#1E293B" opacity="0.3"></line>`;
    gridLines += `<text x="${paddingLeft - 10}" y="${maxYVal + 4}" text-anchor="end" fill="#4B5563" font-size="10">75k€</text>`;

    // Render curves paths
    let cumulatedPath = `M ${getX(0)} ${getY(rawData[0].cumulated)}`;
    let expensesPath = `M ${getX(0)} ${getY(rawData[0].expenses)}`;
    let revenuePath = `M ${getX(0)} ${getY(rawData[0].revenue)}`;
    
    for (let i = 1; i < rawData.length; i++) {
      cumulatedPath += ` L ${getX(i)} ${getY(rawData[i].cumulated)}`;
      expensesPath += ` L ${getX(i)} ${getY(rawData[i].expenses)}`;
      revenuePath += ` L ${getX(i)} ${getY(rawData[i].revenue)}`;
    }
    
    // Draw dots and interactive points
    let dataPoints = "";
    rawData.forEach((d, i) => {
      const x = getX(i);
      const cyCum = getY(d.cumulated);
      const isBreakEven = i + 1 === finances.breakEvenMonth;
      
      dataPoints += `
        <g class="chart-point-group" style="cursor: pointer;" 
           onmouseover="IQSTACK_CHARTS.onLineHover(this, ${d.month}, ${d.revenue}, ${d.expenses}, ${d.cumulated}, ${x}, ${cyCum})"
           onmouseout="IQSTACK_CHARTS.onLineHover(this, null)">
          <circle cx="${x}" cy="${cyCum}" r="${isBreakEven ? 7 : 4}" 
                  fill="${isBreakEven ? '#F59E0B' : '#10B981'}" 
                  stroke="#0B0F19" stroke-width="2">
          </circle>
          ${isBreakEven ? `
            <circle cx="${x}" cy="${cyCum}" r="12" fill="none" stroke="#F59E0B" opacity="0.5" class="ping-animation" style="transform-origin: ${x}px ${cyCum}px;"></circle>
          ` : ""}
        </g>
      `;
    });

    let svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;" id="break-even-svg">
        <defs>
          <linearGradient id="cumGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"></stop>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        
        <!-- Axes and Grid -->
        ${gridLines}
        
        <!-- Y-Axis labels and ticks -->
        <line x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${height - paddingBottom}" stroke="#1E293B"></line>
        <line x1="${paddingLeft}" y1="${height - paddingBottom}" x2="${width - paddingRight}" y2="${height - paddingBottom}" stroke="#1E293B"></line>
        
        <!-- X-Axis Labels (Months) -->
        ${rawData.map((d, i) => `<text x="${getX(i)}" y="${height - paddingBottom + 20}" text-anchor="middle" fill="#9CA3AF" font-size="10">M${d.month}</text>`).join("")}
        
        <!-- Area fill under Cumulated -->
        <path d="${cumulatedPath} L ${getX(rawData.length - 1)} ${zeroY} L ${getX(0)} ${zeroY} Z" fill="url(#cumGlow)"></path>

        <!-- Paths -->
        <path d="${expensesPath}" fill="none" stroke="#EF4444" stroke-width="2" opacity="0.6" stroke-dasharray="3"></path>
        <path d="${revenuePath}" fill="none" stroke="#3B82F6" stroke-width="2" opacity="0.6"></path>
        <path d="${cumulatedPath}" fill="none" stroke="#10B981" stroke-width="4" stroke-linecap="round"></path>
        
        <!-- Interactive Elements -->
        ${dataPoints}
        
        <!-- Tooltip Placeholder -->
        <g id="chart-tooltip" visibility="hidden" opacity="0">
          <rect width="130" height="70" rx="8" fill="#151D30" stroke="#1E293B" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"></rect>
          <text id="tooltip-title" x="10" y="20" fill="#9CA3AF" font-family="var(--font-title)" font-size="10" font-weight="bold"></text>
          <text id="tooltip-rev" x="10" y="38" fill="#3B82F6" font-family="var(--font-body)" font-size="10"></text>
          <text id="tooltip-exp" x="10" y="50" fill="#EF4444" font-family="var(--font-body)" font-size="10"></text>
          <text id="tooltip-cum" x="10" y="62" fill="#10B981" font-family="var(--font-body)" font-size="10" font-weight="bold"></text>
        </g>
      </svg>
    `;
    
    container.innerHTML = svgContent;
  },

  onLineHover(element, month, revenue, expenses, cumulated, x, y) {
    const tooltip = document.getElementById("chart-tooltip");
    if (!tooltip) return;
    
    if (month === null) {
      tooltip.setAttribute("visibility", "hidden");
      tooltip.setAttribute("opacity", "0");
      return;
    }
    
    // Position tooltip safely
    const svg = document.getElementById("break-even-svg");
    const svgRect = svg.getBoundingClientRect();
    
    let tooltipX = x + 10;
    let tooltipY = y - 80;
    
    // Prevent drawing outside SVG
    if (tooltipX + 130 > 600) {
      tooltipX = x - 140;
    }
    if (tooltipY < 0) {
      tooltipY = y + 10;
    }
    
    tooltip.setAttribute("transform", `translate(${tooltipX}, ${tooltipY})`);
    tooltip.setAttribute("visibility", "visible");
    tooltip.setAttribute("opacity", "1");
    tooltip.style.transition = "transform 0.2s ease, opacity 0.2s ease";
    
    document.getElementById("tooltip-title").textContent = `Mes ${month} - Resumen`;
    document.getElementById("tooltip-rev").textContent = `Ingresos: ${revenue.toLocaleString()} €`;
    document.getElementById("tooltip-exp").textContent = `Gastos: ${expenses.toLocaleString()} €`;
    document.getElementById("tooltip-cum").textContent = `Acumulado: ${cumulated.toLocaleString()} €`;
  }
};

// Expose globally
window.IQSTACK_CHARTS = IQSTACK_CHARTS;
