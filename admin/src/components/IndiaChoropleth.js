import React, { useState, useEffect, useMemo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import topojson from "topojson-client";

/*
  NOTES:
  - This component fetches an India GeoJSON/topojson (public URL).
  - Replace `geoUrl` with your own hosted topojson if you prefer.
  - Provide `stateData` prop as an array:
    [{ state: "Uttar Pradesh", id: "UP", value: 42 }, ...]
*/

const geoUrl =
    "https://raw.githubusercontent.com/nikhilkumarsingh/india-state-map/master/india_state.geojson";
// (This is a public geojson; replace with any reliable source if you prefer)

const tooltipStyle = {
    position: "absolute",
    pointerEvents: "none",
    background: "rgba(0,0,0,0.75)",
    color: "#fff",
    padding: "6px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    zIndex: 1000,
};

const IndiaChoropleth = ({ stateData = [] /* sample data if empty */ }) => {
    const [geographies, setGeographies] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

    useEffect(() => {
        let mounted = true;
        fetch(geoUrl)
            .then((r) => r.json())
            .then((geojson) => {
                if (!mounted) return;
                // If it's topojson, convert to geojson:
                // topojson.feature(...) — but this URL already returns geojson
                setGeographies(geojson.features || geojson);
            })
            .catch((err) => {
                console.error("Failed to load geojson:", err);
            });
        return () => (mounted = false);
    }, []);

    // Build a lookup by state name (normalize names)
    const lookup = useMemo(() => {
        const map = new Map();
        stateData.forEach((s) => {
            map.set(String(s.state).trim().toLowerCase(), s);
            if (s.id) map.set(String(s.id).trim().toLowerCase(), s);
        });
        return map;
    }, [stateData]);

    // compute color scale from values
    const values = stateData.map((d) => Number(d.value || 0));
    const maxVal = values.length ? Math.max(...values) : 100;
    const colorScale = scaleLinear().domain([0, maxVal || 1]).range(["#f1f5f9", "#0d6efd"]);

    const handleMouseEnter = (evt, geo) => {
        const name = (geo.properties && (geo.properties.name || geo.properties.NAME_1 || geo.properties.NAME)) || geo.id;
        const item = lookup.get(String(name).trim().toLowerCase());
        const valueText = item ? `${item.value}` : "No data";
        setTooltip({
            visible: true,
            x: evt.clientX + 12,
            y: evt.clientY + 12,
            text: `${name}: ${valueText}`,
        });
    };

    const handleMouseMove = (evt) => {
        setTooltip((t) => ({ ...t, x: evt.clientX + 12, y: evt.clientY + 12 }));
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, text: "" });
    };

    // Sample fallback data if none provided
    const sample = [
        { state: "Uttar Pradesh", value: 80 },
        { state: "Maharashtra", value: 70 },
        { state: "Bihar", value: 45 },
        { state: "West Bengal", value: 50 },
        { state: "Karnataka", value: 60 },
        { state: "Tamil Nadu", value: 55 },
    ];

    const data = stateData.length ? stateData : sample;

    return (
        <div style={{ position: "relative", minHeight: "360px" }}>
            {tooltip.visible && (
                <div style={{ ...tooltipStyle, left: tooltip.x, top: tooltip.y }}>{tooltip.text}</div>
            )}

            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000, center: [80, 22] }}>
                <ZoomableGroup>
                    <Geographies geography={geographies}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const name = (geo.properties && (geo.properties.name || geo.properties.NAME_1 || geo.properties.NAME)) || geo.id;
                                const item = lookup.get(String(name).trim().toLowerCase());
                                const v = item ? Number(item.value || 0) : 0;
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={(evt) => handleMouseEnter(evt, geo)}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            default: {
                                                fill: v ? colorScale(v) : "#f8fafc",
                                                outline: "none",
                                                stroke: "#e2e8f0",
                                                strokeWidth: 0.4,
                                            },
                                            hover: {
                                                fill: v ? colorScale(v) : "#e2e8f0",
                                                outline: "none",
                                            },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* Legend */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                <div style={{ fontSize: 13, color: "#444" }}>Low</div>
                <div style={{ display: "flex", height: 12, width: 160, borderRadius: 6, overflow: "hidden" }}>
                    {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                        <div key={i} style={{ flex: 1, background: colorScale(t * (maxVal || 1)) }} />
                    ))}
                </div>
                <div style={{ fontSize: 13, color: "#444" }}>High</div>
            </div>
        </div>
    );
};

export default IndiaChoropleth;
