import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from "recharts";

const P = [{"date":"2025-07-01","dow":1,"overall":71.3,"subjects":{"CG-502 Network Security":86.2,"CS-303 PPS":97.1,"CS-504 CCBDI":91.1,"CS-701 AI (CSE)":45.6,"CS-701 AI (ECE)":49.2,"CS-301 Operating Systems":89.9,"CS-501 Data Science":98.2,"CS-503 HPC":86.3,"CS-753/761 CEPP":36.7}},{"date":"2025-07-03","dow":3,"overall":66.9,"subjects":{"CG-502 Network Security":84.3,"CS-303 PPS":95.2,"CS-504 CCBDI":90.0,"CS-701 AI (CSE)":33.6,"CS-701 AI (ECE)":43.5,"CS-301 Operating Systems":84.9,"CS-501 Data Science":99.3,"CS-503 HPC":79.2,"CS-753/761 CEPP":21.8}},{"date":"2025-07-07","dow":0,"overall":68.5,"subjects":{"CG-502 Network Security":82.2,"CS-303 PPS":96.8,"CS-504 CCBDI":77.9,"CS-701 AI (CSE)":40.5,"CS-701 AI (ECE)":49.9,"CS-301 Operating Systems":84.6,"CS-501 Data Science":98.0,"CS-503 HPC":82.8,"CS-753/761 CEPP":47.9}},{"date":"2025-07-09","dow":2,"overall":66.1,"subjects":{"CG-502 Network Security":80.4,"CS-303 PPS":94.8,"CS-504 CCBDI":74.4,"CS-701 AI (CSE)":41.4,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":81.2,"CS-501 Data Science":94.6,"CS-503 HPC":81.8,"CS-753/761 CEPP":42.6}},{"date":"2025-07-11","dow":4,"overall":66.5,"subjects":{"CG-502 Network Security":84.1,"CS-303 PPS":97.9,"CS-504 CCBDI":69.9,"CS-701 AI (CSE)":35.2,"CS-701 AI (ECE)":48.0,"CS-301 Operating Systems":82.3,"CS-501 Data Science":95.7,"CS-503 HPC":80.2,"CS-753/761 CEPP":38.1}},{"date":"2025-07-15","dow":1,"overall":66.0,"subjects":{"CG-502 Network Security":83.8,"CS-303 PPS":95.0,"CS-504 CCBDI":81.4,"CS-701 AI (CSE)":36.0,"CS-701 AI (ECE)":47.0,"CS-301 Operating Systems":84.8,"CS-501 Data Science":96.3,"CS-503 HPC":81.5,"CS-753/761 CEPP":39.9}},{"date":"2025-07-17","dow":3,"overall":59.0,"subjects":{"CG-502 Network Security":65.7,"CS-303 PPS":94.6,"CS-504 CCBDI":72.7,"CS-701 AI (CSE)":30.0,"CS-701 AI (ECE)":41.7,"CS-301 Operating Systems":78.7,"CS-501 Data Science":93.5,"CS-503 HPC":69.5,"CS-753/761 CEPP":29.8}},{"date":"2025-07-21","dow":0,"overall":64.0,"subjects":{"CG-502 Network Security":70.1,"CS-303 PPS":93.2,"CS-504 CCBDI":79.5,"CS-701 AI (CSE)":30.3,"CS-701 AI (ECE)":22.0,"CS-301 Operating Systems":79.4,"CS-501 Data Science":93.6,"CS-503 HPC":72.5,"CS-753/761 CEPP":39.1}},{"date":"2025-07-23","dow":2,"overall":63.6,"subjects":{"CG-502 Network Security":69.8,"CS-303 PPS":93.5,"CS-504 CCBDI":79.6,"CS-701 AI (CSE)":35.1,"CS-701 AI (ECE)":24.1,"CS-301 Operating Systems":75.5,"CS-501 Data Science":93.0,"CS-503 HPC":70.0,"CS-753/761 CEPP":25.7}},{"date":"2025-07-25","dow":4,"overall":67.3,"subjects":{"CG-502 Network Security":71.3,"CS-303 PPS":97.1,"CS-504 CCBDI":77.0,"CS-701 AI (CSE)":34.4,"CS-701 AI (ECE)":30.5,"CS-301 Operating Systems":75.7,"CS-501 Data Science":95.0,"CS-503 HPC":65.4,"CS-753/761 CEPP":37.6}},{"date":"2025-07-29","dow":1,"overall":57.8,"subjects":{"CG-502 Network Security":64.6,"CS-303 PPS":95.7,"CS-504 CCBDI":74.3,"CS-701 AI (CSE)":27.5,"CS-701 AI (ECE)":16.2,"CS-301 Operating Systems":72.9,"CS-501 Data Science":94.1,"CS-503 HPC":64.8,"CS-753/761 CEPP":35.8}},{"date":"2025-07-31","dow":3,"overall":73.5,"subjects":{"CG-502 Network Security":67.7,"CS-303 PPS":99.5,"CS-504 CCBDI":80.6,"CS-701 AI (CSE)":35.7,"CS-701 AI (ECE)":17.4,"CS-301 Operating Systems":74.8,"CS-501 Data Science":95.6,"CS-503 HPC":67.0,"CS-753/761 CEPP":31.7}},{"date":"2025-08-04","dow":0,"overall":81.0,"subjects":{"CG-502 Network Security":83.5,"CS-303 PPS":96.7,"CS-504 CCBDI":89.8,"CS-701 AI (CSE)":55.9,"CS-701 AI (ECE)":66.8,"CS-301 Operating Systems":86.8,"CS-501 Data Science":98.2,"CS-503 HPC":85.2,"CS-753/761 CEPP":61.2}},{"date":"2025-08-06","dow":2,"overall":71.9,"subjects":{"CG-502 Network Security":73.8,"CS-303 PPS":92.6,"CS-504 CCBDI":69.9,"CS-701 AI (CSE)":53.9,"CS-701 AI (ECE)":64.3,"CS-301 Operating Systems":82.9,"CS-501 Data Science":100,"CS-503 HPC":86.6,"CS-753/761 CEPP":60.2}},{"date":"2025-08-08","dow":4,"overall":71.0,"subjects":{"CG-502 Network Security":86.0,"CS-303 PPS":98.1,"CS-504 CCBDI":75.0,"CS-701 AI (CSE)":44.7,"CS-701 AI (ECE)":60.1,"CS-301 Operating Systems":86.4,"CS-501 Data Science":98.1,"CS-503 HPC":83.5,"CS-753/761 CEPP":50.7}},{"date":"2025-08-12","dow":1,"overall":75.9,"subjects":{"CG-502 Network Security":86.3,"CS-303 PPS":94.8,"CS-504 CCBDI":83.4,"CS-701 AI (CSE)":39.7,"CS-701 AI (ECE)":52.6,"CS-301 Operating Systems":84.6,"CS-501 Data Science":96.3,"CS-503 HPC":85.3,"CS-753/761 CEPP":53.7}},{"date":"2025-08-14","dow":3,"overall":67.4,"subjects":{"CG-502 Network Security":77.1,"CS-303 PPS":98.0,"CS-504 CCBDI":74.7,"CS-701 AI (CSE)":40.2,"CS-701 AI (ECE)":55.5,"CS-301 Operating Systems":78.4,"CS-501 Data Science":88.1,"CS-503 HPC":66.6,"CS-753/761 CEPP":35.3}},{"date":"2025-08-18","dow":0,"overall":78.0,"subjects":{"CG-502 Network Security":80.3,"CS-303 PPS":97.1,"CS-504 CCBDI":82.8,"CS-701 AI (CSE)":59.5,"CS-701 AI (ECE)":72.8,"CS-301 Operating Systems":84.8,"CS-501 Data Science":94.6,"CS-503 HPC":77.2,"CS-753/761 CEPP":78.2}},{"date":"2025-08-20","dow":2,"overall":70.8,"subjects":{"CG-502 Network Security":70.3,"CS-303 PPS":96.3,"CS-504 CCBDI":83.6,"CS-701 AI (CSE)":40.1,"CS-701 AI (ECE)":30.8,"CS-301 Operating Systems":77.6,"CS-501 Data Science":93.3,"CS-503 HPC":70.5,"CS-753/761 CEPP":18.3}},{"date":"2025-08-22","dow":4,"overall":80.9,"subjects":{"CG-502 Network Security":84.8,"CS-303 PPS":97.8,"CS-504 CCBDI":85.4,"CS-701 AI (CSE)":68.9,"CS-701 AI (ECE)":68.6,"CS-301 Operating Systems":92.8,"CS-501 Data Science":95.4,"CS-503 HPC":79.7,"CS-753/761 CEPP":73.7}},{"date":"2025-08-26","dow":1,"overall":74.5,"subjects":{"CG-502 Network Security":56.2,"CS-303 PPS":94.6,"CS-504 CCBDI":76.9,"CS-701 AI (CSE)":54.5,"CS-701 AI (ECE)":63.9,"CS-301 Operating Systems":80.7,"CS-501 Data Science":92.5,"CS-503 HPC":61.9,"CS-753/761 CEPP":75.6}},{"date":"2025-08-28","dow":3,"overall":69.2,"subjects":{"CG-502 Network Security":39.8,"CS-303 PPS":87.6,"CS-504 CCBDI":75.1,"CS-701 AI (CSE)":53.3,"CS-701 AI (ECE)":65.1,"CS-301 Operating Systems":79.3,"CS-501 Data Science":90.2,"CS-503 HPC":52.5,"CS-753/761 CEPP":71.5}},{"date":"2025-09-01","dow":0,"overall":84.5,"subjects":{"CG-502 Network Security":81.1,"CS-303 PPS":92.8,"CS-504 CCBDI":86.8,"CS-701 AI (CSE)":74.5,"CS-701 AI (ECE)":71.5,"CS-301 Operating Systems":90.5,"CS-501 Data Science":93.0,"CS-503 HPC":79.8,"CS-753/761 CEPP":63.9}},{"date":"2025-09-03","dow":2,"overall":74.3,"subjects":{"CG-502 Network Security":83.5,"CS-303 PPS":92.1,"CS-504 CCBDI":86.5,"CS-701 AI (CSE)":59.5,"CS-701 AI (ECE)":58.5,"CS-301 Operating Systems":84.3,"CS-501 Data Science":94.7,"CS-503 HPC":74.5,"CS-753/761 CEPP":34.4}},{"date":"2025-09-05","dow":4,"overall":78.5,"subjects":{"CG-502 Network Security":80.1,"CS-303 PPS":96.4,"CS-504 CCBDI":76.9,"CS-701 AI (CSE)":60.3,"CS-701 AI (ECE)":59.4,"CS-301 Operating Systems":84.3,"CS-501 Data Science":94.9,"CS-503 HPC":78.4,"CS-753/761 CEPP":62.6}},{"date":"2025-09-09","dow":1,"overall":77.2,"subjects":{"CG-502 Network Security":81.2,"CS-303 PPS":93.7,"CS-504 CCBDI":80.8,"CS-701 AI (CSE)":55.6,"CS-701 AI (ECE)":63.7,"CS-301 Operating Systems":86.2,"CS-501 Data Science":94.5,"CS-503 HPC":86.1,"CS-753/761 CEPP":66.3}},{"date":"2025-09-11","dow":3,"overall":78.1,"subjects":{"CG-502 Network Security":78.6,"CS-303 PPS":96.5,"CS-504 CCBDI":74.4,"CS-701 AI (CSE)":67.0,"CS-701 AI (ECE)":69.8,"CS-301 Operating Systems":88.5,"CS-501 Data Science":94.6,"CS-503 HPC":83.8,"CS-753/761 CEPP":75.2}},{"date":"2025-09-15","dow":0,"overall":81.1,"subjects":{"CG-502 Network Security":81.8,"CS-303 PPS":96.1,"CS-504 CCBDI":86.7,"CS-701 AI (CSE)":62.3,"CS-701 AI (ECE)":62.1,"CS-301 Operating Systems":87.7,"CS-501 Data Science":97.5,"CS-503 HPC":82.6,"CS-753/761 CEPP":61.0}},{"date":"2025-09-17","dow":2,"overall":66.8,"subjects":{"CG-502 Network Security":54.7,"CS-303 PPS":95.2,"CS-504 CCBDI":78.4,"CS-701 AI (CSE)":59.4,"CS-701 AI (ECE)":49.9,"CS-301 Operating Systems":79.3,"CS-501 Data Science":93.8,"CS-503 HPC":66.7,"CS-753/761 CEPP":47.7}},{"date":"2025-09-19","dow":4,"overall":75.7,"subjects":{"CG-502 Network Security":85.4,"CS-303 PPS":98.4,"CS-504 CCBDI":79.0,"CS-701 AI (CSE)":61.8,"CS-701 AI (ECE)":43.3,"CS-301 Operating Systems":84.9,"CS-501 Data Science":96.2,"CS-503 HPC":84.1,"CS-753/761 CEPP":56.8}},{"date":"2025-09-23","dow":1,"overall":77.1,"subjects":{"CG-502 Network Security":81.5,"CS-303 PPS":96.4,"CS-504 CCBDI":87.7,"CS-701 AI (CSE)":57.2,"CS-701 AI (ECE)":46.5,"CS-301 Operating Systems":87.7,"CS-501 Data Science":96.1,"CS-503 HPC":85.0,"CS-753/761 CEPP":67.1}},{"date":"2025-09-25","dow":3,"overall":71.4,"subjects":{"CG-502 Network Security":63.4,"CS-303 PPS":93.7,"CS-504 CCBDI":77.2,"CS-701 AI (CSE)":53.9,"CS-701 AI (ECE)":41.7,"CS-301 Operating Systems":75.6,"CS-501 Data Science":93.1,"CS-503 HPC":66.4,"CS-753/761 CEPP":63.4}},{"date":"2025-09-29","dow":0,"overall":68.0,"subjects":{"CG-502 Network Security":72.9,"CS-303 PPS":97.0,"CS-504 CCBDI":66.2,"CS-701 AI (CSE)":57.2,"CS-701 AI (ECE)":37.1,"CS-301 Operating Systems":64.6,"CS-501 Data Science":93.9,"CS-503 HPC":71.4,"CS-753/761 CEPP":64.0}},{"date":"2025-10-01","dow":2,"overall":63.0,"subjects":{"CG-502 Network Security":73.6,"CS-303 PPS":93.1,"CS-504 CCBDI":79.4,"CS-701 AI (CSE)":68.5,"CS-701 AI (ECE)":47.2,"CS-301 Operating Systems":82.2,"CS-501 Data Science":92.2,"CS-503 HPC":68.9,"CS-753/761 CEPP":33.3}},{"date":"2025-10-03","dow":4,"overall":67.2,"subjects":{"CG-502 Network Security":73.4,"CS-303 PPS":94.5,"CS-504 CCBDI":73.9,"CS-701 AI (CSE)":56.0,"CS-701 AI (ECE)":42.4,"CS-301 Operating Systems":79.0,"CS-501 Data Science":95.9,"CS-503 HPC":66.8,"CS-753/761 CEPP":41.9}},{"date":"2025-10-07","dow":1,"overall":74.0,"subjects":{"CG-502 Network Security":77.7,"CS-303 PPS":96.6,"CS-504 CCBDI":74.3,"CS-701 AI (CSE)":67.3,"CS-701 AI (ECE)":53.8,"CS-301 Operating Systems":84.6,"CS-501 Data Science":95.0,"CS-503 HPC":79.7,"CS-753/761 CEPP":68.5}},{"date":"2025-10-09","dow":3,"overall":72.2,"subjects":{"CG-502 Network Security":73.8,"CS-303 PPS":96.8,"CS-504 CCBDI":69.7,"CS-701 AI (CSE)":68.9,"CS-701 AI (ECE)":58.5,"CS-301 Operating Systems":84.2,"CS-501 Data Science":94.6,"CS-503 HPC":77.2,"CS-753/761 CEPP":72.0}},{"date":"2025-10-13","dow":0,"overall":72.8,"subjects":{"CG-502 Network Security":64.6,"CS-303 PPS":97.1,"CS-504 CCBDI":65.9,"CS-701 AI (CSE)":42.5,"CS-701 AI (ECE)":48.9,"CS-301 Operating Systems":72.0,"CS-501 Data Science":95.3,"CS-503 HPC":65.9,"CS-753/761 CEPP":55.1}},{"date":"2025-10-15","dow":2,"overall":48.0,"subjects":{"CG-502 Network Security":48.8,"CS-303 PPS":94.2,"CS-504 CCBDI":63.7,"CS-701 AI (CSE)":39.7,"CS-701 AI (ECE)":41.0,"CS-301 Operating Systems":61.7,"CS-501 Data Science":94.8,"CS-503 HPC":51.2,"CS-753/761 CEPP":29.3}},{"date":"2025-10-17","dow":4,"overall":43.7,"subjects":{"CG-502 Network Security":30.2,"CS-303 PPS":93.7,"CS-504 CCBDI":33.4,"CS-701 AI (CSE)":26.2,"CS-701 AI (ECE)":26.8,"CS-301 Operating Systems":46.9,"CS-501 Data Science":89.0,"CS-503 HPC":29.7,"CS-753/761 CEPP":30.1}},{"date":"2025-10-21","dow":1,"overall":66.0,"subjects":{"CG-502 Network Security":54.2,"CS-303 PPS":94.8,"CS-504 CCBDI":57.3,"CS-701 AI (CSE)":38.1,"CS-701 AI (ECE)":34.3,"CS-301 Operating Systems":56.6,"CS-501 Data Science":93.9,"CS-503 HPC":57.3,"CS-753/761 CEPP":52.7}},{"date":"2025-10-23","dow":3,"overall":67.8,"subjects":{"CG-502 Network Security":53.4,"CS-303 PPS":98.7,"CS-504 CCBDI":59.7,"CS-701 AI (CSE)":43.7,"CS-701 AI (ECE)":34.9,"CS-301 Operating Systems":59.0,"CS-501 Data Science":93.7,"CS-503 HPC":55.9,"CS-753/761 CEPP":49.9}},{"date":"2025-10-27","dow":0,"overall":58.2,"subjects":{"CG-502 Network Security":53.2,"CS-303 PPS":98.0,"CS-504 CCBDI":44.4,"CS-701 AI (CSE)":37.3,"CS-701 AI (ECE)":39.6,"CS-301 Operating Systems":43.9,"CS-501 Data Science":92.9,"CS-503 HPC":56.0,"CS-753/761 CEPP":58.9}},{"date":"2025-10-29","dow":2,"overall":64.3,"subjects":{"CG-502 Network Security":71.0,"CS-303 PPS":99.5,"CS-504 CCBDI":68.4,"CS-701 AI (CSE)":65.6,"CS-701 AI (ECE)":46.5,"CS-301 Operating Systems":62.8,"CS-501 Data Science":92.0,"CS-503 HPC":67.7,"CS-753/761 CEPP":53.4}},{"date":"2025-10-31","dow":4,"overall":74.4,"subjects":{"CG-502 Network Security":78.2,"CS-303 PPS":78.8,"CS-504 CCBDI":73.4,"CS-701 AI (CSE)":68.3,"CS-701 AI (ECE)":59.5,"CS-301 Operating Systems":78.9,"CS-501 Data Science":89.9,"CS-503 HPC":80.6,"CS-753/761 CEPP":72.1}},{"date":"2025-11-04","dow":1,"overall":79.7,"subjects":{"CG-502 Network Security":85.4,"CS-303 PPS":90.6,"CS-504 CCBDI":91.3,"CS-701 AI (CSE)":74.7,"CS-701 AI (ECE)":68.4,"CS-301 Operating Systems":87.2,"CS-501 Data Science":95.9,"CS-503 HPC":84.5,"CS-753/761 CEPP":75.8}},{"date":"2025-11-06","dow":3,"overall":73.1,"subjects":{"CG-502 Network Security":70.7,"CS-303 PPS":83.8,"CS-504 CCBDI":63.3,"CS-701 AI (CSE)":68.8,"CS-701 AI (ECE)":64.6,"CS-301 Operating Systems":79.3,"CS-501 Data Science":91.9,"CS-503 HPC":75.0,"CS-753/761 CEPP":73.2}},{"date":"2025-11-10","dow":0,"overall":74.0,"subjects":{"CG-502 Network Security":71.6,"CS-303 PPS":84.0,"CS-504 CCBDI":77.5,"CS-701 AI (CSE)":56.5,"CS-701 AI (ECE)":46.6,"CS-301 Operating Systems":85.0,"CS-501 Data Science":96.0,"CS-503 HPC":76.3,"CS-753/761 CEPP":56.4}},{"date":"2025-11-12","dow":2,"overall":79.5,"subjects":{"CG-502 Network Security":87.2,"CS-303 PPS":99.1,"CS-504 CCBDI":80.3,"CS-701 AI (CSE)":83.8,"CS-701 AI (ECE)":71.9,"CS-301 Operating Systems":82.6,"CS-501 Data Science":100,"CS-503 HPC":86.4,"CS-753/761 CEPP":77.8}},{"date":"2025-11-14","dow":4,"overall":62.5,"subjects":{"CG-502 Network Security":58.2,"CS-303 PPS":70.1,"CS-504 CCBDI":66.1,"CS-701 AI (CSE)":53.3,"CS-701 AI (ECE)":46.3,"CS-301 Operating Systems":73.7,"CS-501 Data Science":76.3,"CS-503 HPC":55.7,"CS-753/761 CEPP":59.1}},{"date":"2025-11-18","dow":1,"overall":75.2,"subjects":{"CG-502 Network Security":66.2,"CS-303 PPS":70.4,"CS-504 CCBDI":85.5,"CS-701 AI (CSE)":67.5,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":75.8,"CS-501 Data Science":98.8,"CS-503 HPC":81.1,"CS-753/761 CEPP":77.2}},{"date":"2025-11-20","dow":3,"overall":78.5,"subjects":{"CG-502 Network Security":61.2,"CS-303 PPS":68.5,"CS-504 CCBDI":92.0,"CS-701 AI (CSE)":72.3,"CS-701 AI (ECE)":43.4,"CS-301 Operating Systems":83.5,"CS-501 Data Science":95.2,"CS-503 HPC":78.8,"CS-753/761 CEPP":76.5}},{"date":"2025-11-24","dow":0,"overall":77.4,"subjects":{"CG-502 Network Security":63.8,"CS-303 PPS":66.5,"CS-504 CCBDI":89.2,"CS-701 AI (CSE)":67.0,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":81.3,"CS-501 Data Science":96.4,"CS-503 HPC":80.5,"CS-753/761 CEPP":83.3}},{"date":"2025-11-26","dow":2,"overall":76.4,"subjects":{"CG-502 Network Security":60.8,"CS-303 PPS":64.6,"CS-504 CCBDI":87.5,"CS-701 AI (CSE)":70.9,"CS-701 AI (ECE)":50.1,"CS-301 Operating Systems":79.0,"CS-501 Data Science":92.8,"CS-503 HPC":79.1,"CS-753/761 CEPP":72.0}},{"date":"2025-11-28","dow":4,"overall":71.4,"subjects":{"CG-502 Network Security":63.8,"CS-303 PPS":65.8,"CS-504 CCBDI":87.5,"CS-701 AI (CSE)":70.3,"CS-701 AI (ECE)":56.8,"CS-301 Operating Systems":86.0,"CS-501 Data Science":91.0,"CS-503 HPC":83.8,"CS-753/761 CEPP":89.6}},{"date":"2025-12-02","dow":1,"overall":71.9,"subjects":{"CG-502 Network Security":72.5,"CS-303 PPS":71.6,"CS-504 CCBDI":95.4,"CS-701 AI (CSE)":70.0,"CS-701 AI (ECE)":49.6,"CS-301 Operating Systems":91.0,"CS-501 Data Science":92.6,"CS-503 HPC":86.8,"CS-753/761 CEPP":70.5}},{"date":"2025-12-04","dow":3,"overall":71.4,"subjects":{"CG-502 Network Security":66.0,"CS-303 PPS":70.6,"CS-504 CCBDI":92.1,"CS-701 AI (CSE)":65.8,"CS-701 AI (ECE)":40.9,"CS-301 Operating Systems":90.6,"CS-501 Data Science":89.4,"CS-503 HPC":81.5,"CS-753/761 CEPP":73.2}},{"date":"2025-12-08","dow":0,"overall":66.6,"subjects":{"CG-502 Network Security":64.2,"CS-303 PPS":69.7,"CS-504 CCBDI":87.4,"CS-701 AI (CSE)":65.6,"CS-701 AI (ECE)":43.4,"CS-301 Operating Systems":87.5,"CS-501 Data Science":93.1,"CS-503 HPC":80.3,"CS-753/761 CEPP":69.2}},{"date":"2025-12-10","dow":2,"overall":73.3,"subjects":{"CG-502 Network Security":61.8,"CS-303 PPS":68.1,"CS-504 CCBDI":85.7,"CS-701 AI (CSE)":68.4,"CS-701 AI (ECE)":43.9,"CS-301 Operating Systems":88.3,"CS-501 Data Science":90.2,"CS-503 HPC":81.8,"CS-753/761 CEPP":66.4}},{"date":"2025-12-12","dow":4,"overall":73.3,"subjects":{"CG-502 Network Security":70.2,"CS-303 PPS":71.6,"CS-504 CCBDI":80.1,"CS-701 AI (CSE)":77.1,"CS-701 AI (ECE)":59.6,"CS-301 Operating Systems":90.6,"CS-501 Data Science":88.2,"CS-503 HPC":83.8,"CS-753/761 CEPP":89.1}},{"date":"2025-12-16","dow":1,"overall":70.6,"subjects":{"CG-502 Network Security":55.5,"CS-303 PPS":62.8,"CS-504 CCBDI":88.9,"CS-701 AI (CSE)":59.3,"CS-701 AI (ECE)":42.5,"CS-301 Operating Systems":82.8,"CS-501 Data Science":93.2,"CS-503 HPC":71.0,"CS-753/761 CEPP":74.0}},{"date":"2025-12-18","dow":3,"overall":72.8,"subjects":{"CG-502 Network Security":67.2,"CS-303 PPS":67.1,"CS-504 CCBDI":90.5,"CS-701 AI (CSE)":75.1,"CS-701 AI (ECE)":46.7,"CS-301 Operating Systems":82.4,"CS-501 Data Science":94.9,"CS-503 HPC":83.4,"CS-753/761 CEPP":79.9}},{"date":"2025-12-22","dow":0,"overall":76.3,"subjects":{"CG-502 Network Security":64.0,"CS-303 PPS":66.6,"CS-504 CCBDI":91.0,"CS-701 AI (CSE)":67.0,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":81.5,"CS-501 Data Science":97.6,"CS-503 HPC":80.7,"CS-753/761 CEPP":82.3}},{"date":"2025-12-24","dow":2,"overall":73.3,"subjects":{"CG-502 Network Security":61.9,"CS-303 PPS":64.6,"CS-504 CCBDI":88.1,"CS-701 AI (CSE)":71.5,"CS-701 AI (ECE)":48.9,"CS-301 Operating Systems":79.0,"CS-501 Data Science":92.8,"CS-503 HPC":79.7,"CS-753/761 CEPP":70.2}},{"date":"2025-12-26","dow":4,"overall":76.7,"subjects":{"CG-502 Network Security":64.1,"CS-303 PPS":66.1,"CS-504 CCBDI":89.5,"CS-701 AI (CSE)":70.4,"CS-701 AI (ECE)":55.7,"CS-301 Operating Systems":88.9,"CS-501 Data Science":91.4,"CS-503 HPC":83.9,"CS-753/761 CEPP":88.4}},{"date":"2025-12-30","dow":1,"overall":69.4,"subjects":{"CG-502 Network Security":64.5,"CS-303 PPS":67.1,"CS-504 CCBDI":80.8,"CS-701 AI (CSE)":66.2,"CS-701 AI (ECE)":42.7,"CS-301 Operating Systems":73.7,"CS-501 Data Science":92.8,"CS-503 HPC":78.4,"CS-753/761 CEPP":77.0}},{"date":"2026-01-01","dow":3,"overall":69.3,"subjects":{"CG-502 Network Security":66.8,"CS-303 PPS":70.3,"CS-504 CCBDI":90.4,"CS-701 AI (CSE)":67.2,"CS-701 AI (ECE)":39.7,"CS-301 Operating Systems":87.9,"CS-501 Data Science":87.5,"CS-503 HPC":76.5,"CS-753/761 CEPP":53.3}},{"date":"2026-01-05","dow":0,"overall":73.9,"subjects":{"CG-502 Network Security":73.0,"CS-303 PPS":72.5,"CS-504 CCBDI":93.9,"CS-701 AI (CSE)":68.5,"CS-701 AI (ECE)":48.0,"CS-301 Operating Systems":88.8,"CS-501 Data Science":91.2,"CS-503 HPC":83.8,"CS-753/761 CEPP":69.4}},{"date":"2026-01-07","dow":2,"overall":70.6,"subjects":{"CG-502 Network Security":63.2,"CS-303 PPS":67.7,"CS-504 CCBDI":80.9,"CS-701 AI (CSE)":68.1,"CS-701 AI (ECE)":44.6,"CS-301 Operating Systems":84.5,"CS-501 Data Science":86.6,"CS-503 HPC":79.2,"CS-753/761 CEPP":65.4}},{"date":"2026-01-09","dow":4,"overall":70.8,"subjects":{"CG-502 Network Security":63.8,"CS-303 PPS":68.6,"CS-504 CCBDI":76.0,"CS-701 AI (CSE)":63.7,"CS-701 AI (ECE)":43.2,"CS-301 Operating Systems":86.4,"CS-501 Data Science":83.4,"CS-503 HPC":77.7,"CS-753/761 CEPP":66.0}},{"date":"2026-01-13","dow":1,"overall":67.0,"subjects":{"CG-502 Network Security":57.5,"CS-303 PPS":68.5,"CS-504 CCBDI":83.1,"CS-701 AI (CSE)":57.4,"CS-701 AI (ECE)":42.5,"CS-301 Operating Systems":84.5,"CS-501 Data Science":87.7,"CS-503 HPC":69.9,"CS-753/761 CEPP":69.9}},{"date":"2026-01-15","dow":3,"overall":64.2,"subjects":{"CG-502 Network Security":49.0,"CS-303 PPS":61.6,"CS-504 CCBDI":80.8,"CS-701 AI (CSE)":58.2,"CS-701 AI (ECE)":42.3,"CS-301 Operating Systems":80.0,"CS-501 Data Science":87.8,"CS-503 HPC":63.7,"CS-753/761 CEPP":61.5}},{"date":"2026-01-19","dow":0,"overall":73.8,"subjects":{"CG-502 Network Security":63.8,"CS-303 PPS":66.0,"CS-504 CCBDI":87.3,"CS-701 AI (CSE)":63.9,"CS-701 AI (ECE)":46.1,"CS-301 Operating Systems":78.0,"CS-501 Data Science":94.0,"CS-503 HPC":77.7,"CS-753/761 CEPP":76.0}},{"date":"2026-01-21","dow":2,"overall":72.7,"subjects":{"CG-502 Network Security":61.0,"CS-303 PPS":64.8,"CS-504 CCBDI":86.3,"CS-701 AI (CSE)":69.6,"CS-701 AI (ECE)":46.1,"CS-301 Operating Systems":76.8,"CS-501 Data Science":90.8,"CS-503 HPC":75.8,"CS-753/761 CEPP":65.8}},{"date":"2026-01-23","dow":4,"overall":77.6,"subjects":{"CG-502 Network Security":70.4,"CS-303 PPS":66.6,"CS-504 CCBDI":90.1,"CS-701 AI (CSE)":75.0,"CS-701 AI (ECE)":53.8,"CS-301 Operating Systems":85.9,"CS-501 Data Science":89.3,"CS-503 HPC":84.7,"CS-753/761 CEPP":79.2}},{"date":"2026-01-27","dow":1,"overall":69.3,"subjects":{"CG-502 Network Security":60.2,"CS-303 PPS":65.6,"CS-504 CCBDI":77.6,"CS-701 AI (CSE)":64.4,"CS-701 AI (ECE)":50.9,"CS-301 Operating Systems":71.4,"CS-501 Data Science":92.0,"CS-503 HPC":75.6,"CS-753/761 CEPP":83.5}},{"date":"2026-01-29","dow":3,"overall":69.1,"subjects":{"CG-502 Network Security":63.0,"CS-303 PPS":66.1,"CS-504 CCBDI":85.2,"CS-701 AI (CSE)":70.3,"CS-701 AI (ECE)":41.7,"CS-301 Operating Systems":77.8,"CS-501 Data Science":90.3,"CS-503 HPC":78.1,"CS-753/761 CEPP":70.5}},{"date":"2026-02-02","dow":0,"overall":72.1,"subjects":{"CG-502 Network Security":72.6,"CS-303 PPS":70.7,"CS-504 CCBDI":93.8,"CS-701 AI (CSE)":68.3,"CS-701 AI (ECE)":50.8,"CS-301 Operating Systems":88.2,"CS-501 Data Science":91.1,"CS-503 HPC":84.9,"CS-753/761 CEPP":69.5}},{"date":"2026-02-04","dow":2,"overall":70.5,"subjects":{"CG-502 Network Security":70.7,"CS-303 PPS":69.7,"CS-504 CCBDI":92.1,"CS-701 AI (CSE)":69.5,"CS-701 AI (ECE)":46.8,"CS-301 Operating Systems":87.5,"CS-501 Data Science":86.4,"CS-503 HPC":80.2,"CS-753/761 CEPP":60.2}},{"date":"2026-02-06","dow":4,"overall":71.2,"subjects":{"CG-502 Network Security":62.1,"CS-303 PPS":67.6,"CS-504 CCBDI":69.8,"CS-701 AI (CSE)":63.3,"CS-701 AI (ECE)":43.0,"CS-301 Operating Systems":86.3,"CS-501 Data Science":84.4,"CS-503 HPC":79.1,"CS-753/761 CEPP":65.8}},{"date":"2026-02-10","dow":1,"overall":66.2,"subjects":{"CG-502 Network Security":64.9,"CS-303 PPS":69.7,"CS-504 CCBDI":84.8,"CS-701 AI (CSE)":60.3,"CS-701 AI (ECE)":40.2,"CS-301 Operating Systems":85.3,"CS-501 Data Science":90.0,"CS-503 HPC":80.2,"CS-753/761 CEPP":66.7}},{"date":"2026-02-12","dow":3,"overall":71.3,"subjects":{"CG-502 Network Security":66.7,"CS-303 PPS":69.7,"CS-504 CCBDI":79.8,"CS-701 AI (CSE)":77.0,"CS-701 AI (ECE)":58.9,"CS-301 Operating Systems":86.4,"CS-501 Data Science":87.4,"CS-503 HPC":79.5,"CS-753/761 CEPP":84.5}},{"date":"2026-02-16","dow":0,"overall":72.8,"subjects":{"CG-502 Network Security":50.9,"CS-303 PPS":61.8,"CS-504 CCBDI":88.1,"CS-701 AI (CSE)":54.5,"CS-701 AI (ECE)":39.5,"CS-301 Operating Systems":79.7,"CS-501 Data Science":90.4,"CS-503 HPC":65.0,"CS-753/761 CEPP":68.3}},{"date":"2026-02-18","dow":2,"overall":72.7,"subjects":{"CG-502 Network Security":64.8,"CS-303 PPS":65.0,"CS-504 CCBDI":86.0,"CS-701 AI (CSE)":72.6,"CS-701 AI (ECE)":49.2,"CS-301 Operating Systems":76.5,"CS-501 Data Science":90.7,"CS-503 HPC":79.0,"CS-753/761 CEPP":67.6}},{"date":"2026-02-20","dow":4,"overall":75.4,"subjects":{"CG-502 Network Security":67.6,"CS-303 PPS":68.7,"CS-504 CCBDI":88.5,"CS-701 AI (CSE)":72.6,"CS-701 AI (ECE)":48.8,"CS-301 Operating Systems":84.8,"CS-501 Data Science":89.1,"CS-503 HPC":81.3,"CS-753/761 CEPP":72.6}},{"date":"2026-02-24","dow":1,"overall":74.6,"subjects":{"CG-502 Network Security":64.1,"CS-303 PPS":66.8,"CS-504 CCBDI":86.5,"CS-701 AI (CSE)":65.3,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":79.3,"CS-501 Data Science":93.2,"CS-503 HPC":79.1,"CS-753/761 CEPP":80.7}},{"date":"2026-02-26","dow":3,"overall":74.4,"subjects":{"CG-502 Network Security":55.3,"CS-303 PPS":65.3,"CS-504 CCBDI":86.4,"CS-701 AI (CSE)":65.5,"CS-701 AI (ECE)":49.3,"CS-301 Operating Systems":80.2,"CS-501 Data Science":90.7,"CS-503 HPC":72.0,"CS-753/761 CEPP":77.5}},{"date":"2026-03-02","dow":0,"overall":72.1,"subjects":{"CG-502 Network Security":72.6,"CS-303 PPS":70.7,"CS-504 CCBDI":93.8,"CS-701 AI (CSE)":68.3,"CS-701 AI (ECE)":50.8,"CS-301 Operating Systems":88.2,"CS-501 Data Science":91.1,"CS-503 HPC":84.9,"CS-753/761 CEPP":69.5}},{"date":"2026-03-04","dow":2,"overall":70.5,"subjects":{"CG-502 Network Security":70.7,"CS-303 PPS":69.7,"CS-504 CCBDI":92.1,"CS-701 AI (CSE)":69.5,"CS-701 AI (ECE)":46.8,"CS-301 Operating Systems":87.5,"CS-501 Data Science":86.4,"CS-503 HPC":80.2,"CS-753/761 CEPP":60.2}},{"date":"2026-03-06","dow":4,"overall":71.2,"subjects":{"CG-502 Network Security":62.1,"CS-303 PPS":67.6,"CS-504 CCBDI":69.8,"CS-701 AI (CSE)":63.3,"CS-701 AI (ECE)":43.0,"CS-301 Operating Systems":86.3,"CS-501 Data Science":84.4,"CS-503 HPC":79.1,"CS-753/761 CEPP":65.8}},{"date":"2026-03-10","dow":1,"overall":66.2,"subjects":{"CG-502 Network Security":64.9,"CS-303 PPS":69.7,"CS-504 CCBDI":84.8,"CS-701 AI (CSE)":60.3,"CS-701 AI (ECE)":40.2,"CS-301 Operating Systems":85.3,"CS-501 Data Science":90.0,"CS-503 HPC":80.2,"CS-753/761 CEPP":66.7}},{"date":"2026-03-12","dow":3,"overall":71.3,"subjects":{"CG-502 Network Security":66.7,"CS-303 PPS":69.7,"CS-504 CCBDI":79.8,"CS-701 AI (CSE)":77.0,"CS-701 AI (ECE)":58.9,"CS-301 Operating Systems":86.4,"CS-501 Data Science":87.4,"CS-503 HPC":79.5,"CS-753/761 CEPP":84.5}},{"date":"2026-03-16","dow":0,"overall":72.8,"subjects":{"CG-502 Network Security":50.9,"CS-303 PPS":61.8,"CS-504 CCBDI":88.1,"CS-701 AI (CSE)":54.5,"CS-701 AI (ECE)":39.5,"CS-301 Operating Systems":79.7,"CS-501 Data Science":90.4,"CS-503 HPC":65.0,"CS-753/761 CEPP":68.3}},{"date":"2026-03-18","dow":2,"overall":72.7,"subjects":{"CG-502 Network Security":64.8,"CS-303 PPS":65.0,"CS-504 CCBDI":86.0,"CS-701 AI (CSE)":72.6,"CS-701 AI (ECE)":49.2,"CS-301 Operating Systems":76.5,"CS-501 Data Science":90.7,"CS-503 HPC":79.0,"CS-753/761 CEPP":67.6}},{"date":"2026-03-20","dow":4,"overall":75.4,"subjects":{"CG-502 Network Security":67.6,"CS-303 PPS":68.7,"CS-504 CCBDI":88.5,"CS-701 AI (CSE)":72.6,"CS-701 AI (ECE)":48.8,"CS-301 Operating Systems":84.8,"CS-501 Data Science":89.1,"CS-503 HPC":81.3,"CS-753/761 CEPP":72.6}},{"date":"2026-03-24","dow":1,"overall":74.6,"subjects":{"CG-502 Network Security":64.1,"CS-303 PPS":66.8,"CS-504 CCBDI":86.5,"CS-701 AI (CSE)":65.3,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":79.3,"CS-501 Data Science":93.2,"CS-503 HPC":79.1,"CS-753/761 CEPP":80.7}},{"date":"2026-03-26","dow":3,"overall":74.4,"subjects":{"CG-502 Network Security":55.3,"CS-303 PPS":65.3,"CS-504 CCBDI":86.4,"CS-701 AI (CSE)":65.5,"CS-701 AI (ECE)":49.3,"CS-301 Operating Systems":80.2,"CS-501 Data Science":90.7,"CS-503 HPC":72.0,"CS-753/761 CEPP":77.5}},{"date":"2026-03-30","dow":0,"overall":68.5,"subjects":{"CG-502 Network Security":65.1,"CS-303 PPS":67.0,"CS-504 CCBDI":76.8,"CS-701 AI (CSE)":65.7,"CS-701 AI (ECE)":41.8,"CS-301 Operating Systems":68.1,"CS-501 Data Science":93.0,"CS-503 HPC":77.4,"CS-753/761 CEPP":76.1}},{"date":"2026-04-01","dow":2,"overall":68.5,"subjects":{"CG-502 Network Security":69.9,"CS-303 PPS":69.3,"CS-504 CCBDI":91.3,"CS-701 AI (CSE)":71.3,"CS-701 AI (ECE)":43.3,"CS-301 Operating Systems":87.4,"CS-501 Data Science":86.8,"CS-503 HPC":75.9,"CS-753/761 CEPP":45.6}},{"date":"2026-04-03","dow":4,"overall":70.5,"subjects":{"CG-502 Network Security":70.0,"CS-303 PPS":68.4,"CS-504 CCBDI":87.2,"CS-701 AI (CSE)":58.6,"CS-701 AI (ECE)":38.0,"CS-301 Operating Systems":84.6,"CS-501 Data Science":85.5,"CS-503 HPC":75.1,"CS-753/761 CEPP":51.7}},{"date":"2026-04-07","dow":1,"overall":66.6,"subjects":{"CG-502 Network Security":65.7,"CS-303 PPS":70.7,"CS-504 CCBDI":82.9,"CS-701 AI (CSE)":65.6,"CS-701 AI (ECE)":44.4,"CS-301 Operating Systems":85.4,"CS-501 Data Science":89.6,"CS-503 HPC":80.0,"CS-753/761 CEPP":67.6}},{"date":"2026-04-09","dow":3,"overall":70.7,"subjects":{"CG-502 Network Security":61.4,"CS-303 PPS":69.0,"CS-504 CCBDI":78.6,"CS-701 AI (CSE)":66.4,"CS-701 AI (ECE)":43.9,"CS-301 Operating Systems":86.2,"CS-501 Data Science":86.5,"CS-503 HPC":77.3,"CS-753/761 CEPP":69.7}},{"date":"2026-04-13","dow":0,"overall":65.8,"subjects":{"CG-502 Network Security":57.2,"CS-303 PPS":67.8,"CS-504 CCBDI":82.8,"CS-701 AI (CSE)":56.5,"CS-701 AI (ECE)":41.8,"CS-301 Operating Systems":84.0,"CS-501 Data Science":87.9,"CS-503 HPC":68.8,"CS-753/761 CEPP":69.3}},{"date":"2026-04-15","dow":2,"overall":64.3,"subjects":{"CG-502 Network Security":49.7,"CS-303 PPS":61.0,"CS-504 CCBDI":85.9,"CS-701 AI (CSE)":60.4,"CS-701 AI (ECE)":43.4,"CS-301 Operating Systems":78.0,"CS-501 Data Science":87.5,"CS-503 HPC":63.5,"CS-753/761 CEPP":56.0}},{"date":"2026-04-17","dow":4,"overall":64.7,"subjects":{"CG-502 Network Security":43.4,"CS-303 PPS":60.3,"CS-504 CCBDI":74.5,"CS-701 AI (CSE)":53.4,"CS-701 AI (ECE)":39.6,"CS-301 Operating Systems":78.9,"CS-501 Data Science":81.1,"CS-503 HPC":60.8,"CS-753/761 CEPP":59.4}},{"date":"2026-04-21","dow":1,"overall":75.2,"subjects":{"CG-502 Network Security":64.0,"CS-303 PPS":67.0,"CS-504 CCBDI":87.9,"CS-701 AI (CSE)":64.4,"CS-701 AI (ECE)":45.6,"CS-301 Operating Systems":79.5,"CS-501 Data Science":94.3,"CS-503 HPC":78.8,"CS-753/761 CEPP":77.4}},{"date":"2026-04-23","dow":3,"overall":75.8,"subjects":{"CG-502 Network Security":62.4,"CS-303 PPS":66.0,"CS-504 CCBDI":90.1,"CS-701 AI (CSE)":71.0,"CS-701 AI (ECE)":47.0,"CS-301 Operating Systems":82.5,"CS-501 Data Science":92.3,"CS-503 HPC":78.0,"CS-753/761 CEPP":74.7}},{"date":"2026-04-27","dow":0,"overall":67.2,"subjects":{"CG-502 Network Security":60.3,"CS-303 PPS":65.5,"CS-504 CCBDI":72.7,"CS-701 AI (CSE)":63.5,"CS-701 AI (ECE)":50.0,"CS-301 Operating Systems":65.7,"CS-501 Data Science":92.4,"CS-503 HPC":75.0,"CS-753/761 CEPP":82.6}},{"date":"2026-04-29","dow":2,"overall":68.6,"subjects":{"CG-502 Network Security":63.8,"CS-303 PPS":65.2,"CS-504 CCBDI":84.2,"CS-701 AI (CSE)":71.4,"CS-701 AI (ECE)":43.0,"CS-301 Operating Systems":74.1,"CS-501 Data Science":89.2,"CS-503 HPC":77.4,"CS-753/761 CEPP":64.1}},{"date":"2026-05-01","dow":4,"overall":69.4,"subjects":{"CG-502 Network Security":67.8,"CS-303 PPS":69.9,"CS-504 CCBDI":85.7,"CS-701 AI (CSE)":64.5,"CS-701 AI (ECE)":39.1,"CS-301 Operating Systems":85.7,"CS-501 Data Science":84.4,"CS-503 HPC":77.2,"CS-753/761 CEPP":51.7}},{"date":"2026-05-05","dow":1,"overall":74.6,"subjects":{"CG-502 Network Security":73.9,"CS-303 PPS":73.2,"CS-504 CCBDI":94.2,"CS-701 AI (CSE)":69.5,"CS-701 AI (ECE)":48.7,"CS-301 Operating Systems":89.3,"CS-501 Data Science":91.0,"CS-503 HPC":85.5,"CS-753/761 CEPP":70.0}},{"date":"2026-05-07","dow":3,"overall":71.5,"subjects":{"CG-502 Network Security":61.7,"CS-303 PPS":68.5,"CS-504 CCBDI":77.5,"CS-701 AI (CSE)":65.9,"CS-701 AI (ECE)":43.6,"CS-301 Operating Systems":86.0,"CS-501 Data Science":86.7,"CS-503 HPC":77.3,"CS-753/761 CEPP":69.4}},{"date":"2026-05-11","dow":0,"overall":65.0,"subjects":{"CG-502 Network Security":63.7,"CS-303 PPS":68.5,"CS-504 CCBDI":84.6,"CS-701 AI (CSE)":60.3,"CS-701 AI (ECE)":40.8,"CS-301 Operating Systems":84.7,"CS-501 Data Science":90.4,"CS-503 HPC":78.7,"CS-753/761 CEPP":67.2}},{"date":"2026-05-13","dow":2,"overall":72.7,"subjects":{"CG-502 Network Security":54.5,"CS-303 PPS":66.7,"CS-504 CCBDI":80.8,"CS-701 AI (CSE)":65.3,"CS-701 AI (ECE)":47.4,"CS-301 Operating Systems":84.4,"CS-501 Data Science":84.5,"CS-503 HPC":69.3,"CS-753/761 CEPP":68.8}},{"date":"2026-05-15","dow":4,"overall":64.7,"subjects":{"CG-502 Network Security":49.8,"CS-303 PPS":61.0,"CS-504 CCBDI":75.0,"CS-701 AI (CSE)":55.5,"CS-701 AI (ECE)":42.4,"CS-301 Operating Systems":79.7,"CS-501 Data Science":82.1,"CS-503 HPC":63.4,"CS-753/761 CEPP":59.0}},{"date":"2026-05-19","dow":1,"overall":75.1,"subjects":{"CG-502 Network Security":63.9,"CS-303 PPS":66.5,"CS-504 CCBDI":87.0,"CS-701 AI (CSE)":64.8,"CS-701 AI (ECE)":46.7,"CS-301 Operating Systems":78.5,"CS-501 Data Science":93.8,"CS-503 HPC":79.5,"CS-753/761 CEPP":76.7}},{"date":"2026-05-21","dow":3,"overall":73.9,"subjects":{"CG-502 Network Security":62.0,"CS-303 PPS":66.0,"CS-504 CCBDI":89.7,"CS-701 AI (CSE)":69.9,"CS-701 AI (ECE)":44.0,"CS-301 Operating Systems":82.5,"CS-501 Data Science":92.1,"CS-503 HPC":77.4,"CS-753/761 CEPP":72.6}},{"date":"2026-05-25","dow":0,"overall":72.6,"subjects":{"CG-502 Network Security":61.0,"CS-303 PPS":66.4,"CS-504 CCBDI":84.2,"CS-701 AI (CSE)":63.8,"CS-701 AI (ECE)":49.0,"CS-301 Operating Systems":76.8,"CS-501 Data Science":93.3,"CS-503 HPC":75.7,"CS-753/761 CEPP":81.6}},{"date":"2026-05-27","dow":2,"overall":68.6,"subjects":{"CG-502 Network Security":58.9,"CS-303 PPS":63.5,"CS-504 CCBDI":80.0,"CS-701 AI (CSE)":69.6,"CS-701 AI (ECE)":51.4,"CS-301 Operating Systems":71.8,"CS-501 Data Science":88.7,"CS-503 HPC":74.4,"CS-753/761 CEPP":71.9}},{"date":"2026-05-29","dow":4,"overall":70.9,"subjects":{"CG-502 Network Security":69.8,"CS-303 PPS":65.9,"CS-504 CCBDI":85.5,"CS-701 AI (CSE)":73.2,"CS-701 AI (ECE)":48.0,"CS-301 Operating Systems":80.8,"CS-501 Data Science":87.2,"CS-503 HPC":84.6,"CS-753/761 CEPP":74.8}},{"date":"2026-06-02","dow":1,"overall":72.6,"subjects":{"CG-502 Network Security":74.5,"CS-303 PPS":72.3,"CS-504 CCBDI":94.0,"CS-701 AI (CSE)":69.3,"CS-701 AI (ECE)":51.5,"CS-301 Operating Systems":88.7,"CS-501 Data Science":90.9,"CS-503 HPC":86.6,"CS-753/761 CEPP":70.1}},{"date":"2026-06-04","dow":3,"overall":71.3,"subjects":{"CG-502 Network Security":67.5,"CS-303 PPS":70.7,"CS-504 CCBDI":90.3,"CS-701 AI (CSE)":65.4,"CS-701 AI (ECE)":43.0,"CS-301 Operating Systems":87.9,"CS-501 Data Science":86.9,"CS-503 HPC":80.5,"CS-753/761 CEPP":67.7}},{"date":"2026-06-08","dow":0,"overall":65.4,"subjects":{"CG-502 Network Security":64.5,"CS-303 PPS":69.4,"CS-504 CCBDI":84.4,"CS-701 AI (CSE)":63.9,"CS-701 AI (ECE)":43.5,"CS-301 Operating Systems":84.4,"CS-501 Data Science":89.8,"CS-503 HPC":78.0,"CS-753/761 CEPP":66.7}},{"date":"2026-06-10","dow":2,"overall":73.0,"subjects":{"CG-502 Network Security":62.4,"CS-303 PPS":67.9,"CS-504 CCBDI":82.6,"CS-701 AI (CSE)":68.2,"CS-701 AI (ECE)":45.2,"CS-301 Operating Systems":85.2,"CS-501 Data Science":86.8,"CS-503 HPC":79.6,"CS-753/761 CEPP":65.3}},{"date":"2026-06-12","dow":4,"overall":71.4,"subjects":{"CG-502 Network Security":70.2,"CS-303 PPS":70.8,"CS-504 CCBDI":77.4,"CS-701 AI (CSE)":76.5,"CS-701 AI (ECE)":60.5,"CS-301 Operating Systems":87.1,"CS-501 Data Science":84.4,"CS-503 HPC":80.3,"CS-753/761 CEPP":83.1}},{"date":"2026-06-16","dow":1,"overall":71.9,"subjects":{"CG-502 Network Security":50.9,"CS-303 PPS":62.6,"CS-504 CCBDI":86.7,"CS-701 AI (CSE)":55.5,"CS-701 AI (ECE)":40.2,"CS-301 Operating Systems":80.3,"CS-501 Data Science":89.8,"CS-503 HPC":65.9,"CS-753/761 CEPP":69.0}},{"date":"2026-06-18","dow":3,"overall":72.6,"subjects":{"CG-502 Network Security":67.2,"CS-303 PPS":67.2,"CS-504 CCBDI":88.0,"CS-701 AI (CSE)":73.9,"CS-701 AI (ECE)":47.0,"CS-301 Operating Systems":79.3,"CS-501 Data Science":92.0,"CS-503 HPC":80.5,"CS-753/761 CEPP":74.0}},{"date":"2026-06-22","dow":0,"overall":74.1,"subjects":{"CG-502 Network Security":64.4,"CS-303 PPS":66.7,"CS-504 CCBDI":88.6,"CS-701 AI (CSE)":64.4,"CS-701 AI (ECE)":47.8,"CS-301 Operating Systems":79.0,"CS-501 Data Science":94.6,"CS-503 HPC":78.5,"CS-753/761 CEPP":78.8}},{"date":"2026-06-24","dow":2,"overall":73.1,"subjects":{"CG-502 Network Security":61.9,"CS-303 PPS":64.6,"CS-504 CCBDI":85.7,"CS-701 AI (CSE)":70.6,"CS-701 AI (ECE)":49.3,"CS-301 Operating Systems":76.5,"CS-501 Data Science":89.7,"CS-503 HPC":76.9,"CS-753/761 CEPP":69.0}},{"date":"2026-06-26","dow":4,"overall":76.2,"subjects":{"CG-502 Network Security":62.9,"CS-303 PPS":65.9,"CS-504 CCBDI":85.9,"CS-701 AI (CSE)":69.2,"CS-701 AI (ECE)":55.7,"CS-301 Operating Systems":83.3,"CS-501 Data Science":87.7,"CS-503 HPC":78.6,"CS-753/761 CEPP":81.9}},{"date":"2026-06-30","dow":1,"overall":69.3,"subjects":{"CG-502 Network Security":65.0,"CS-303 PPS":67.1,"CS-504 CCBDI":81.7,"CS-701 AI (CSE)":66.6,"CS-701 AI (ECE)":42.7,"CS-301 Operating Systems":73.8,"CS-501 Data Science":92.6,"CS-503 HPC":78.4,"CS-753/761 CEPP":77.0}}];
const M = {"subject_avg":{"CS-504 CCBDI":77.85,"CG-502 Network Security":73.67,"CS-301 Operating Systems":77.59,"CS-701 AI (CSE)":59.82,"CS-503 HPC":74.84,"CS-753/761 CEPP":58.77,"CS-701 AI (ECE)":55.39,"CS-303 PPS":93.52,"CS-501 Data Science":93.65},"subject_sizes":{"CG-502 Network Security":76,"CS-303 PPS":79,"CS-504 CCBDI":57,"CS-701 AI (CSE)":80,"CS-701 AI (ECE)":78,"CS-301 Operating Systems":116,"CS-501 Data Science":75,"CS-503 HPC":75,"CS-753/761 CEPP":126},"dow_avg":{"1":74.03,"4":74.91,"2":69.88,"3":72.72,"5":70.54,"6":80.63,"0":79.15},"monthly_avg":{"7":66.81,"8":73.73,"9":79.59,"10":68.28,"11":75.66},"overall_avg":73.84,"date_range":{"start":"2025-07-01","end":"2025-11-29"},"total_records":38091,"total_students":444,"hist":[{"date":"2025-07-01","present":68,"total":74,"attendance_pct":91.89},{"date":"2025-07-04","present":32,"total":39,"attendance_pct":82.05},{"date":"2025-07-29","present":21,"total":34,"attendance_pct":61.76},{"date":"2025-07-30","present":209,"total":387,"attendance_pct":54.01},{"date":"2025-07-31","present":280,"total":379,"attendance_pct":73.88},{"date":"2025-08-01","present":376,"total":504,"attendance_pct":74.6},{"date":"2025-08-02","present":73,"total":74,"attendance_pct":98.65},{"date":"2025-08-03","present":108,"total":129,"attendance_pct":83.72},{"date":"2025-08-04","present":384,"total":482,"attendance_pct":79.67},{"date":"2025-08-05","present":373,"total":440,"attendance_pct":84.77},{"date":"2025-08-06","present":469,"total":647,"attendance_pct":72.49},{"date":"2025-08-07","present":385,"total":519,"attendance_pct":74.18},{"date":"2025-08-08","present":332,"total":469,"attendance_pct":70.79},{"date":"2025-08-09","present":30,"total":57,"attendance_pct":52.63},{"date":"2025-08-10","present":37,"total":57,"attendance_pct":64.91},{"date":"2025-08-11","present":437,"total":605,"attendance_pct":72.23},{"date":"2025-08-12","present":357,"total":476,"attendance_pct":75.0},{"date":"2025-08-13","present":477,"total":610,"attendance_pct":78.2},{"date":"2025-08-14","present":554,"total":831,"attendance_pct":66.67},{"date":"2025-08-15","present":117,"total":136,"attendance_pct":86.03},{"date":"2025-08-16","present":39,"total":57,"attendance_pct":68.42},{"date":"2025-08-17","present":52,"total":57,"attendance_pct":91.23},{"date":"2025-08-18","present":450,"total":566,"attendance_pct":79.51},{"date":"2025-08-19","present":372,"total":489,"attendance_pct":76.07},{"date":"2025-08-20","present":414,"total":689,"attendance_pct":60.09},{"date":"2025-08-21","present":422,"total":601,"attendance_pct":70.22},{"date":"2025-08-22","present":456,"total":539,"attendance_pct":84.6},{"date":"2025-08-25","present":76,"total":79,"attendance_pct":96.2},{"date":"2025-08-26","present":178,"total":237,"attendance_pct":75.11},{"date":"2025-08-27","present":35,"total":40,"attendance_pct":87.5},{"date":"2025-08-28","present":336,"total":507,"attendance_pct":66.27},{"date":"2025-08-29","present":355,"total":492,"attendance_pct":72.15},{"date":"2025-08-30","present":301,"total":454,"attendance_pct":66.3},{"date":"2025-09-01","present":419,"total":489,"attendance_pct":85.69},{"date":"2025-09-02","present":523,"total":624,"attendance_pct":83.81},{"date":"2025-09-03","present":521,"total":696,"attendance_pct":74.86},{"date":"2025-09-04","present":464,"total":582,"attendance_pct":79.73},{"date":"2025-09-05","present":77,"total":79,"attendance_pct":97.47},{"date":"2025-09-08","present":543,"total":649,"attendance_pct":83.67},{"date":"2025-09-09","present":403,"total":539,"attendance_pct":74.77},{"date":"2025-09-10","present":518,"total":631,"attendance_pct":82.09},{"date":"2025-09-11","present":552,"total":667,"attendance_pct":82.76},{"date":"2025-09-12","present":368,"total":449,"attendance_pct":81.96},{"date":"2025-09-15","present":311,"total":371,"attendance_pct":83.83},{"date":"2025-09-16","present":457,"total":624,"attendance_pct":73.24},{"date":"2025-09-17","present":395,"total":589,"attendance_pct":67.06},{"date":"2025-09-18","present":583,"total":733,"attendance_pct":79.54},{"date":"2025-09-19","present":200,"total":265,"attendance_pct":75.47},{"date":"2025-09-22","present":77,"total":79,"attendance_pct":97.47},{"date":"2025-09-23","present":38,"total":39,"attendance_pct":97.44},{"date":"2025-09-24","present":34,"total":40,"attendance_pct":85.0},{"date":"2025-09-26","present":76,"total":79,"attendance_pct":96.2},{"date":"2025-09-29","present":78,"total":79,"attendance_pct":98.73},{"date":"2025-09-30","present":123,"total":190,"attendance_pct":64.74},{"date":"2025-10-01","present":271,"total":441,"attendance_pct":61.45},{"date":"2025-10-02","present":74,"total":79,"attendance_pct":93.67},{"date":"2025-10-03","present":227,"total":341,"attendance_pct":66.57},{"date":"2025-10-06","present":380,"total":457,"attendance_pct":83.15},{"date":"2025-10-07","present":550,"total":733,"attendance_pct":75.03},{"date":"2025-10-08","present":601,"total":778,"attendance_pct":77.25},{"date":"2025-10-09","present":439,"total":585,"attendance_pct":75.04},{"date":"2025-10-10","present":615,"total":779,"attendance_pct":78.95},{"date":"2025-10-11","present":109,"total":138,"attendance_pct":78.99},{"date":"2025-10-12","present":52,"total":72,"attendance_pct":72.22},{"date":"2025-10-13","present":317,"total":428,"attendance_pct":74.07},{"date":"2025-10-14","present":422,"total":699,"attendance_pct":60.37},{"date":"2025-10-15","present":272,"total":556,"attendance_pct":48.92},{"date":"2025-10-16","present":275,"total":592,"attendance_pct":46.45},{"date":"2025-10-17","present":185,"total":449,"attendance_pct":41.2},{"date":"2025-10-18","present":25,"total":78,"attendance_pct":32.05},{"date":"2025-10-20","present":79,"total":79,"attendance_pct":100.0},{"date":"2025-10-21","present":37,"total":39,"attendance_pct":94.87},{"date":"2025-10-22","present":35,"total":40,"attendance_pct":87.5},{"date":"2025-10-23","present":79,"total":79,"attendance_pct":100.0},{"date":"2025-10-24","present":79,"total":79,"attendance_pct":100.0},{"date":"2025-10-27","present":200,"total":348,"attendance_pct":57.47},{"date":"2025-10-28","present":478,"total":659,"attendance_pct":72.53},{"date":"2025-10-29","present":324,"total":513,"attendance_pct":63.16},{"date":"2025-10-30","present":428,"total":592,"attendance_pct":72.3},{"date":"2025-10-31","present":276,"total":369,"attendance_pct":74.8},{"date":"2025-11-03","present":305,"total":372,"attendance_pct":81.99},{"date":"2025-11-04","present":511,"total":623,"attendance_pct":82.02},{"date":"2025-11-06","present":310,"total":437,"attendance_pct":70.94},{"date":"2025-11-07","present":422,"total":518,"attendance_pct":81.47},{"date":"2025-11-08","present":69,"total":75,"attendance_pct":92.0},{"date":"2025-11-09","present":123,"total":150,"attendance_pct":82.0},{"date":"2025-11-10","present":219,"total":297,"attendance_pct":73.74},{"date":"2025-11-11","present":337,"total":596,"attendance_pct":56.54},{"date":"2025-11-12","present":465,"total":556,"attendance_pct":83.63},{"date":"2025-11-13","present":464,"total":627,"attendance_pct":74.0},{"date":"2025-11-14","present":274,"total":440,"attendance_pct":62.27},{"date":"2025-11-15","present":79,"total":114,"attendance_pct":69.3},{"date":"2025-11-16","present":61,"total":72,"attendance_pct":84.72},{"date":"2025-11-17","present":422,"total":570,"attendance_pct":74.04},{"date":"2025-11-18","present":446,"total":576,"attendance_pct":77.43},{"date":"2025-11-19","present":418,"total":598,"attendance_pct":69.9},{"date":"2025-11-20","present":432,"total":547,"attendance_pct":78.98},{"date":"2025-11-21","present":409,"total":483,"attendance_pct":84.68},{"date":"2025-11-22","present":66,"total":72,"attendance_pct":91.67},{"date":"2025-11-24","present":72,"total":75,"attendance_pct":96.0},{"date":"2025-11-29","present":28,"total":42,"attendance_pct":66.67}]};

const SC = {"CG-502 Network Security":"#ff6b35","CS-303 PPS":"#00e5ff","CS-504 CCBDI":"#d946ef","CS-701 AI (CSE)":"#ff3860","CS-701 AI (ECE)":"#f472b6","CS-301 Operating Systems":"#00ff88","CS-501 Data Science":"#4cc9f0","CS-503 HPC":"#ffe14d","CS-753/761 CEPP":"#2dd4bf"};
const DN = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MN = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ---- PARTICLES CANVAS ---- */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    let particles = Array.from({length: 60}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: Math.random()*2+0.5, o: Math.random()*0.5+0.1
    }));
    let mouse = {x: w/2, y: h/2};
    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);
    const onResize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      particles.forEach((p,i) => {
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>w) p.vx*=-1;
        if(p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(100,200,255,${p.o})`;
        ctx.fill();
        // connect nearby
        for(let j=i+1;j<particles.length;j++){
          const dx=p.x-particles[j].x, dy=p.y-particles[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<120){
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle=`rgba(100,200,255,${0.08*(1-dist/120)})`;
            ctx.stroke();
          }
        }
        // mouse attraction
        const mdx=mouse.x-p.x, mdy=mouse.y-p.y;
        const md=Math.sqrt(mdx*mdx+mdy*mdy);
        if(md<200){ p.vx+=mdx*0.00003; p.vy+=mdy*0.00003; }
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",onMouse); window.removeEventListener("resize",onResize); };
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}} />;
}

/* ---- 3D TILT CARD ---- */
function TiltCard({children, style={}, glowColor="rgba(100,200,255,0.15)", className=""}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({x:0,y:0});
  const [hovering, setHovering] = useState(false);
  const onMove = useCallback(e => {
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    setTilt({x: y*-12, y: x*12});
  },[]);
  return <div ref={ref}
    onMouseMove={onMove}
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => {setHovering(false); setTilt({x:0,y:0});}}
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      backdropFilter: "blur(12px)",
      border: hovering ? `1px solid ${glowColor}` : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16, padding: "24px 28px",
      transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovering?1.02:1})`,
      transition: hovering ? "border 0.3s, box-shadow 0.3s" : "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      boxShadow: hovering ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${glowColor}` : "0 4px 20px rgba(0,0,0,0.2)",
      position: "relative", overflow: "hidden", ...style
    }}>
    {hovering && <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at ${(tilt.y/12+0.5)*100}% ${(-tilt.x/12+0.5)*100}%, ${glowColor} 0%, transparent 60%)`,pointerEvents:"none",transition:"all 0.1s"}} />}
    <div style={{position:"relative",zIndex:1}}>{children}</div>
  </div>;
}

/* ---- SCROLL REVEAL ---- */
function SR({children, delay=0, dir="up"}) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true); }, {threshold:0.08});
    if(ref.current) o.observe(ref.current);
    return () => o.disconnect();
  },[]);
  const tr = {up:"translateY(80px)",down:"translateY(-80px)",left:"translateX(-80px)",right:"translateX(80px)",scale:"scale(0.85)"};
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translate(0) scale(1)":tr[dir],transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,willChange:"transform,opacity"}}>{children}</div>;
}

/* ---- ANIMATED COUNTER ---- */
function Counter({value, suffix="", prefix="", dur=1500, color="#fff", size=36}) {
  const [d, setD] = useState(0);
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setGo(true); }, {threshold:0.3});
    if(ref.current) o.observe(ref.current);
    return () => o.disconnect();
  },[]);
  useEffect(() => {
    if(!go) return;
    let s=null;
    const a=(t)=>{if(!s)s=t;const p=Math.min((t-s)/dur,1);const ease=1-Math.pow(1-p,4);setD(Math.round(ease*value*10)/10);if(p<1)requestAnimationFrame(a);};
    requestAnimationFrame(a);
  },[go,value,dur]);
  return <span ref={ref} style={{fontSize:size,fontWeight:800,color,fontFamily:"'Syne',sans-serif",letterSpacing:"-0.02em"}}>{prefix}{d}{suffix}</span>;
}

/* ---- NEON GAUGE ---- */
function NeonGauge({value, size=180, label, color}) {
  const [a, setA] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if(e.isIntersecting) setTimeout(()=>setA(value),300); }, {threshold:0.3});
    if(ref.current) o.observe(ref.current);
    return () => o.disconnect();
  },[value]);
  const r=size/2-16, c=2*Math.PI*r;
  const col = color || (value>=75?"#00ff88":value>=60?"#ffe14d":"#ff3860");
  return <div ref={ref} style={{textAlign:"center",position:"relative"}}>
    <svg width={size} height={size} style={{transform:"rotate(-90deg)",filter:`drop-shadow(0 0 12px ${col}50)`}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={10} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={10}
        strokeDasharray={`${c*0.75} ${c*0.25}`} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={10}
        strokeDasharray={c} strokeDashoffset={c*(1-a/100)} strokeLinecap="round"
        style={{transition:"stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)",filter:`drop-shadow(0 0 8px ${col})`}} />
    </svg>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}}>
      <div style={{fontSize:38,fontWeight:900,color:"#fff",fontFamily:"'Syne',sans-serif",lineHeight:1,textShadow:`0 0 20px ${col}40`}}>{Math.round(a)}%</div>
      {label && <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",letterSpacing:2,marginTop:6,textTransform:"uppercase"}}>{label}</div>}
    </div>
  </div>;
}

/* ---- TOOLTIP ---- */
const CT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return <div style={{background:"rgba(10,10,20,0.95)",backdropFilter:"blur(16px)",border:"1px solid rgba(100,200,255,0.15)",borderRadius:12,padding:"14px 18px",boxShadow:"0 10px 40px rgba(0,0,0,0.6)"}}>
    <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,marginBottom:6,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>{label}</div>
    {payload.map((p,i) => <div key={i} style={{color:p.color||"#fff",fontSize:14,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>{p.name}: {typeof p.value==="number"?p.value.toFixed(1):p.value}%</div>)}
  </div>;
};

/* ---- MAIN APP ---- */
export default function App() {
  const [selDate, setSelDate] = useState("");
  const [pred, setPred] = useState(null);
  const [heroA, setHeroA] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredSubj, setHoveredSubj] = useState(null);
  const subjects = Object.keys(M.subject_avg);

  useEffect(() => { setTimeout(()=>setHeroA(true),100); }, []);

  const histData = useMemo(() => M.hist.map(d => ({date:d.date.slice(5),att:d.attendance_pct,present:d.present,total:d.total})),[]);
  const dowData = useMemo(() => Object.entries(M.dow_avg).map(([d,v]) => ({day:DN[parseInt(d)],att:v})),[]);
  const monthData = useMemo(() => Object.entries(M.monthly_avg).map(([m,v]) => ({month:MN[parseInt(m)],att:v})),[]);
  const subjData = useMemo(() => Object.entries(M.subject_avg).map(([n,a]) => ({name:n.replace("CS-","").replace("CG-",""),fn:n,avg:Math.round(a*10)/10})).sort((a,b)=>b.avg-a.avg),[]);

  const doPredict = () => {
    if(!selDate) return;
    const found = P.find(p => p.date===selDate);
    if(found){setPred(found);return;}
    const dt = new Date(selDate+"T12:00:00");
    const dow = dt.getDay();
    if(dow===0||dow===6){setPred({date:selDate,weekend:true});return;}
    const mAvg = M.monthly_avg[String(dt.getMonth()+1)]||M.overall_avg;
    const dAvg = M.dow_avg[String(dow===0?6:dow-1)]||M.overall_avg;
    const overall = Math.round((mAvg+dAvg)/2*10)/10;
    const subjs = {};
    subjects.forEach(s => {subjs[s]=Math.round(Math.min(100,Math.max(0,M.subject_avg[s]*overall/M.overall_avg))*10)/10;});
    setPred({date:selDate,dow:dow===0?6:dow-1,overall,subjects:subjs});
  };

  const totalStu = 350;

  return <div style={{fontFamily:"'DM Sans','Satoshi',sans-serif",color:"#fff",minHeight:"100vh",background:"#060611",position:"relative"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=DM+Mono:wght@400;500&display=swap');
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
      @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes scanline{0%{top:-100%}100%{top:100%}}
      @keyframes pulseNeon{0%,100%{opacity:0.6;filter:blur(20px)}50%{opacity:1;filter:blur(30px)}}
      @keyframes typing{from{width:0}to{width:100%}}
      @keyframes blink{50%{border-color:transparent}}
      @keyframes slideUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
      @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes ripple{0%{transform:scale(0.8);opacity:0.5}100%{transform:scale(2.5);opacity:0}}
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:#060611;overflow-x:hidden;}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:rgba(100,200,255,0.2);border-radius:10px}
      input[type="date"]{background:rgba(255,255,255,0.04);border:2px solid rgba(100,200,255,0.15);border-radius:12px;color:#fff;padding:18px 24px;font-size:17px;font-family:'DM Sans',sans-serif;outline:none;width:100%;transition:all 0.4s;letter-spacing:0.5px;}
      input[type="date"]:focus{border-color:rgba(100,200,255,0.5);box-shadow:0 0 30px rgba(100,200,255,0.15);background:rgba(100,200,255,0.04);}
      input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(0.7) sepia(1) hue-rotate(170deg);cursor:pointer;transition:all 0.3s;}
      input[type="date"]::-webkit-calendar-picker-indicator:hover{filter:invert(0.9) sepia(1) hue-rotate(170deg);transform:scale(1.2);}
      .nav-pill{padding:10px 24px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.4s;border:1px solid transparent;letter-spacing:0.5px;font-family:'DM Sans',sans-serif;}
      .nav-pill:hover{background:rgba(100,200,255,0.08);}
      .nav-active{background:rgba(100,200,255,0.12)!important;border-color:rgba(100,200,255,0.25)!important;color:#4cc9f0!important;box-shadow:0 0 20px rgba(100,200,255,0.1);}
    `}</style>

    <Particles />

    {/* AMBIENT GLOW ORBS */}
    <div style={{position:"fixed",top:"10%",left:"5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(100,200,255,0.04) 0%,transparent 70%)",animation:"pulseNeon 8s ease-in-out infinite",pointerEvents:"none",zIndex:0}} />
    <div style={{position:"fixed",bottom:"10%",right:"5%",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(217,70,239,0.04) 0%,transparent 70%)",animation:"pulseNeon 10s ease-in-out infinite 2s",pointerEvents:"none",zIndex:0}} />
    <div style={{position:"fixed",top:"50%",left:"50%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,255,136,0.03) 0%,transparent 70%)",animation:"pulseNeon 12s ease-in-out infinite 4s",pointerEvents:"none",zIndex:0}} />

    {/* ===== HERO ===== */}
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px",position:"relative",zIndex:1}}>
      {/* Orbiting ring */}
      <div style={{position:"absolute",top:"50%",left:"50%",width:500,height:500,marginTop:-250,marginLeft:-250,border:"1px solid rgba(100,200,255,0.04)",borderRadius:"50%",animation:"orbit 60s linear infinite"}}>
        <div style={{position:"absolute",top:-4,left:"50%",width:8,height:8,borderRadius:"50%",background:"#4cc9f0",boxShadow:"0 0 12px #4cc9f0"}} />
      </div>
      <div style={{position:"absolute",top:"50%",left:"50%",width:350,height:350,marginTop:-175,marginLeft:-175,border:"1px solid rgba(217,70,239,0.04)",borderRadius:"50%",animation:"orbit 40s linear infinite reverse"}}>
        <div style={{position:"absolute",top:-3,left:"50%",width:6,height:6,borderRadius:"50%",background:"#d946ef",boxShadow:"0 0 10px #d946ef"}} />
      </div>

      <div style={{opacity:heroA?1:0,transform:heroA?"translateY(0) scale(1)":"translateY(30px) scale(0.95)",transition:"all 1.4s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:40}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 10px #00ff88",animation:"pulseNeon 2s ease-in-out infinite"}} />
          <span style={{fontSize:12,letterSpacing:3,textTransform:"uppercase",color:"rgba(100,200,255,0.6)",fontFamily:"'DM Mono',monospace",fontWeight:500}}>SYSTEM ONLINE</span>
        </div>
      </div>

      <h1 style={{fontSize:"clamp(40px,8vw,90px)",fontWeight:800,textAlign:"center",lineHeight:1,maxWidth:900,fontFamily:"'Syne',sans-serif",opacity:heroA?1:0,transform:heroA?"translateY(0)":"translateY(60px)",transition:"all 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s"}}>
        <span style={{background:"linear-gradient(135deg,#fff 0%,#4cc9f0 40%,#d946ef 70%,#00ff88 100%)",backgroundSize:"300% 300%",animation:"gradShift 8s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:"-0.03em"}}>ATTENDANCE</span>
        <br />
        <span style={{color:"rgba(255,255,255,0.15)",letterSpacing:"-0.02em"}}>PREDICTOR</span>
      </h1>

      <p style={{fontSize:"clamp(15px,2vw,19px)",color:"rgba(255,255,255,0.35)",textAlign:"center",maxWidth:550,lineHeight:1.7,marginTop:28,fontWeight:300,opacity:heroA?1:0,transform:heroA?"translateY(0)":"translateY(40px)",transition:"all 1.4s cubic-bezier(0.16,1,0.3,1) 0.25s"}}>
        Machine learning model trained on{" "}
        <span style={{color:"#4cc9f0",fontWeight:600,textShadow:"0 0 10px rgba(76,201,240,0.3)"}}>38,091</span>{" "}
        attendance records to predict campus footfall and optimize temporary services.
      </p>

      {/* Stats strip */}
      <div style={{display:"flex",gap:2,marginTop:56,opacity:heroA?1:0,transform:heroA?"translateY(0)":"translateY(30px)",transition:"all 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s"}}>
        {[{v:"38K+",l:"RECORDS",c:"#4cc9f0"},{v:"9",l:"SUBJECTS",c:"#d946ef"},{v:"444",l:"STUDENTS",c:"#00ff88"},{v:M.overall_avg+"%",l:"AVG RATE",c:"#ffe14d"}].map((s,i) =>
          <div key={i} style={{padding:"20px 32px",background:i===0?"rgba(100,200,255,0.06)":"rgba(255,255,255,0.02)",borderLeft:i>0?"1px solid rgba(255,255,255,0.06)":"none",textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:800,color:s.c,fontFamily:"'Syne',sans-serif",textShadow:`0 0 15px ${s.c}30`}}>{s.v}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:2,marginTop:4,fontFamily:"'DM Mono',monospace"}}>{s.l}</div>
          </div>
        )}
      </div>

      <div style={{marginTop:60,animation:"float 4s ease-in-out infinite",opacity:0.3}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>

    {/* ===== PREDICTION ENGINE ===== */}
    <section style={{padding:"120px 20px 80px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <SR>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{width:40,height:2,background:"linear-gradient(90deg,#4cc9f0,transparent)"}} />
          <span style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#4cc9f0",fontFamily:"'DM Mono',monospace"}}>PREDICTION ENGINE</span>
        </div>
        <h2 style={{fontSize:"clamp(32px,5vw,56px)",fontWeight:800,lineHeight:1.05,fontFamily:"'Syne',sans-serif",marginBottom:16}}>
          Forecast <span style={{color:"#00ff88",textShadow:"0 0 20px rgba(0,255,136,0.2)"}}>Attendance</span>
        </h2>
        <p style={{color:"rgba(255,255,255,0.35)",fontSize:16,maxWidth:500,lineHeight:1.6,marginBottom:48}}>
          Select a future date to generate ML-powered attendance predictions and service allocation recommendations.
        </p>
      </SR>

      <SR delay={200}>
        <TiltCard glowColor="rgba(76,201,240,0.2)" style={{maxWidth:750,padding:"36px 40px",borderRadius:20}}>
          {/* Scanline effect */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(100,200,255,0.3),transparent)",animation:"scanline 4s linear infinite",pointerEvents:"none"}} />
          <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"end"}}>
            <div style={{flex:1,minWidth:260}}>
              <label style={{fontSize:11,color:"rgba(100,200,255,0.5)",marginBottom:10,display:"block",letterSpacing:2,fontFamily:"'DM Mono',monospace"}}>TARGET DATE</label>
              <input type="date" value={selDate} onChange={e=>setSelDate(e.target.value)} min="2025-07-01" max="2026-06-30" />
            </div>
            <button onClick={doPredict} style={{
              padding:"18px 44px",borderRadius:12,border:"2px solid rgba(0,255,136,0.3)",
              background:"linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,255,136,0.03))",
              color:"#00ff88",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif",
              letterSpacing:2,minWidth:200,transition:"all 0.4s",textTransform:"uppercase",
              boxShadow:"0 0 20px rgba(0,255,136,0.1)",position:"relative",overflow:"hidden"
            }}
            onMouseEnter={e=>{e.target.style.background="linear-gradient(135deg,rgba(0,255,136,0.2),rgba(0,255,136,0.08))";e.target.style.boxShadow="0 0 40px rgba(0,255,136,0.2)";e.target.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.target.style.background="linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,255,136,0.03))";e.target.style.boxShadow="0 0 20px rgba(0,255,136,0.1)";e.target.style.transform="translateY(0)";}}
            >PREDICT</button>
          </div>
        </TiltCard>
      </SR>

      {/* RESULTS */}
      {pred && !pred.weekend && <div style={{marginTop:60,animation:"slideUp 0.7s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:40}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 10px #00ff88"}} />
          <span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"'DM Mono',monospace",letterSpacing:1}}>
            PREDICTION FOR {new Date(pred.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).toUpperCase()}
          </span>
        </div>

        {/* Main gauge + services */}
        <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:40,alignItems:"start",marginBottom:50}}>
          <div><NeonGauge value={pred.overall} size={210} label="Overall" /></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
            {[
              {n:"Canteen Meals",icon:"\uD83C\uDF7D\uFE0F",count:Math.round(totalStu*pred.overall/100*0.85),c:"#ff6b35",desc:"85% of present students"},
              {n:"Transport Seats",icon:"\uD83D\uDE8C",count:Math.round(totalStu*pred.overall/100*0.7),c:"#4cc9f0",desc:"70% use college buses"},
              {n:"Lab Stations",icon:"\uD83D\uDCBB",count:Math.round(totalStu*pred.overall/100*0.6),c:"#d946ef",desc:"60% have lab sessions"},
              {n:"On Campus",icon:"\uD83C\uDF93",count:Math.round(totalStu*pred.overall/100),c:"#00ff88",desc:"Total expected present"},
            ].map((s,i) => <SR key={s.n} delay={i*100}>
              <TiltCard glowColor={s.c+"30"} style={{textAlign:"center",padding:"24px 20px"}}>
                <div style={{fontSize:32,marginBottom:6}}>{s.icon}</div>
                <Counter value={s.count} suffix="" color={s.c} size={32} />
                <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.7)",marginTop:8,fontFamily:"'DM Sans',sans-serif"}}>{s.n}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:4,fontFamily:"'DM Mono',monospace",letterSpacing:0.5}}>{s.desc}</div>
              </TiltCard>
            </SR>)}
          </div>
        </div>

        {/* Subject bars */}
        <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:30,height:2,background:"linear-gradient(90deg,#d946ef,transparent)"}} />
          <span style={{fontSize:11,letterSpacing:2,color:"#d946ef",fontFamily:"'DM Mono',monospace"}}>SUBJECT BREAKDOWN</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {Object.entries(pred.subjects).sort((a,b)=>b[1]-a[1]).map(([subj,pct],i) => {
            const col = SC[subj]||"#4cc9f0";
            const cs = M.subject_sizes[subj]||50;
            const isHov = hoveredSubj===subj;
            return <div key={subj}
              onMouseEnter={()=>setHoveredSubj(subj)} onMouseLeave={()=>setHoveredSubj(null)}
              style={{display:"grid",gridTemplateColumns:"200px 1fr 70px 90px",alignItems:"center",gap:16,padding:"14px 20px",borderRadius:12,background:isHov?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.01)",border:`1px solid ${isHov?col+"30":"transparent"}`,transition:"all 0.3s",cursor:"default",animation:`slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i*60}ms both`}}>
              <span style={{fontSize:13,fontWeight:600,color:isHov?"#fff":"rgba(255,255,255,0.6)",transition:"color 0.3s",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{subj}</span>
              <div style={{height:8,borderRadius:4,background:"rgba(255,255,255,0.04)",overflow:"hidden",position:"relative"}}>
                <div style={{height:"100%",borderRadius:4,background:`linear-gradient(90deg,${col},${col}88)`,width:`${pct}%`,transition:"width 1.2s cubic-bezier(0.16,1,0.3,1)",boxShadow:isHov?`0 0 16px ${col}50`:`0 0 8px ${col}20`,position:"relative"}}>
                  {isHov && <div style={{position:"absolute",right:0,top:0,bottom:0,width:20,background:`linear-gradient(90deg,transparent,${col})`,animation:"pulseNeon 1s ease-in-out infinite"}} />}
                </div>
              </div>
              <span style={{fontSize:18,fontWeight:800,color:col,fontFamily:"'Syne',sans-serif",textAlign:"right",textShadow:isHov?`0 0 10px ${col}40`:"none",transition:"text-shadow 0.3s"}}>{Math.round(pct)}%</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.25)",fontFamily:"'DM Mono',monospace",textAlign:"right"}}>{Math.round(cs*pct/100)}/{cs}</span>
            </div>;
          })}
        </div>
      </div>}

      {pred && pred.weekend && <div style={{marginTop:60,animation:"slideUp 0.7s ease-out"}}>
        <TiltCard style={{textAlign:"center",maxWidth:480,margin:"0 auto",padding:"50px 40px"}}>
          <div style={{fontSize:56,marginBottom:16}}>{"🏖️"}</div>
          <h3 style={{fontSize:26,fontWeight:800,fontFamily:"'Syne',sans-serif"}}>Weekend Detected</h3>
          <p style={{color:"rgba(255,255,255,0.35)",marginTop:12,lineHeight:1.6}}>No classes scheduled. All temporary services can be stood down.</p>
        </TiltCard>
      </div>}
    </section>

    {/* ===== ANALYTICS ===== */}
    <section style={{padding:"80px 20px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <SR>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{width:40,height:2,background:"linear-gradient(90deg,#d946ef,transparent)"}} />
          <span style={{fontSize:11,letterSpacing:3,color:"#d946ef",fontFamily:"'DM Mono',monospace"}}>ANALYTICS DASHBOARD</span>
        </div>
        <h2 style={{fontSize:"clamp(32px,5vw,56px)",fontWeight:800,lineHeight:1.05,fontFamily:"'Syne',sans-serif",marginBottom:16}}>
          Historical <span style={{color:"#d946ef",textShadow:"0 0 20px rgba(217,70,239,0.2)"}}>Insights</span>
        </h2>
      </SR>

      {/* Tab nav */}
      <SR delay={100}>
        <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap"}}>
          {[{id:"overview",l:"Overview"},{id:"weekly",l:"Weekly Pattern"},{id:"monthly",l:"Monthly Trend"}].map(t =>
            <button key={t.id} className={`nav-pill ${activeTab===t.id?"nav-active":""}`}
              onClick={()=>setActiveTab(t.id)}
              style={{color:activeTab===t.id?"#4cc9f0":"rgba(255,255,255,0.4)",background:activeTab===t.id?undefined:"transparent"}}>{t.l}</button>
          )}
        </div>
      </SR>

      {activeTab==="overview" && <SR delay={200}>
        <TiltCard style={{padding:"36px 32px"}} glowColor="rgba(217,70,239,0.1)">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
            <h4 style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.5)",fontFamily:"'DM Mono',monospace",letterSpacing:1}}>DAILY ATTENDANCE TREND</h4>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.25)",fontFamily:"'DM Mono',monospace"}}>JUL — NOV 2025</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={histData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4cc9f0" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#4cc9f0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{fill:"rgba(255,255,255,0.2)",fontSize:10,fontFamily:"'DM Mono',monospace"}} axisLine={false} tickLine={false} interval={8} />
              <YAxis domain={[0,100]} tick={{fill:"rgba(255,255,255,0.2)",fontSize:10,fontFamily:"'DM Mono',monospace"}} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Area type="monotone" dataKey="att" stroke="#4cc9f0" fill="url(#g1)" strokeWidth={2} name="Attendance" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </TiltCard>
      </SR>}

      {activeTab==="weekly" && <SR delay={100}>
        <TiltCard style={{padding:"36px 32px"}} glowColor="rgba(0,255,136,0.1)">
          <h4 style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:24,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>DAY OF WEEK PATTERNS</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dowData}>
              <XAxis dataKey="day" tick={{fill:"rgba(255,255,255,0.3)",fontSize:12,fontFamily:"'DM Mono',monospace"}} axisLine={false} tickLine={false} />
              <YAxis domain={[60,90]} tick={{fill:"rgba(255,255,255,0.2)",fontSize:10}} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Bar dataKey="att" name="Avg %" radius={[8,8,0,0]} barSize={40}>
                {dowData.map((_,i) => <Cell key={i} fill={["#4cc9f0","#00e5ff","#00ff88","#ffe14d","#ff6b35","#d946ef","#ff3860"][i]} fillOpacity={0.7} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TiltCard>
      </SR>}

      {activeTab==="monthly" && <SR delay={100}>
        <TiltCard style={{padding:"36px 32px"}} glowColor="rgba(255,225,77,0.1)">
          <h4 style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:24,fontFamily:"'DM Mono',monospace",letterSpacing:1}}>MONTHLY AVERAGES</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthData}>
              <XAxis dataKey="month" tick={{fill:"rgba(255,255,255,0.3)",fontSize:12,fontFamily:"'DM Mono',monospace"}} axisLine={false} tickLine={false} />
              <YAxis domain={[50,100]} tick={{fill:"rgba(255,255,255,0.2)",fontSize:10}} axisLine={false} tickLine={false} />
              <Tooltip content={<CT />} />
              <Bar dataKey="att" name="Avg %" radius={[8,8,0,0]} barSize={50}>
                {monthData.map((_,i) => <Cell key={i} fill={["#ff6b35","#4cc9f0","#00ff88","#ffe14d","#d946ef"][i]} fillOpacity={0.75} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TiltCard>
      </SR>}
    </section>

    {/* ===== SUBJECTS ===== */}
    <section style={{padding:"80px 20px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <SR>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{width:40,height:2,background:"linear-gradient(90deg,#ffe14d,transparent)"}} />
          <span style={{fontSize:11,letterSpacing:3,color:"#ffe14d",fontFamily:"'DM Mono',monospace"}}>SUBJECT ANALYSIS</span>
        </div>
        <h2 style={{fontSize:"clamp(32px,5vw,56px)",fontWeight:800,lineHeight:1.05,fontFamily:"'Syne',sans-serif",marginBottom:48}}>
          Subject <span style={{color:"#ffe14d",textShadow:"0 0 20px rgba(255,225,77,0.15)"}}>Matrix</span>
        </h2>
      </SR>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
        {subjData.map((s,i) => {
          const col = SC[s.fn]||"#4cc9f0";
          const st = s.avg>=75?"OPTIMAL":s.avg>=60?"MODERATE":"CRITICAL";
          const stc = s.avg>=75?"#00ff88":s.avg>=60?"#ffe14d":"#ff3860";
          const cs = M.subject_sizes[s.fn]||50;
          return <SR key={s.fn} delay={i*80} dir="scale">
            <TiltCard glowColor={col+"25"} style={{padding:"28px 28px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:20}}>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:"rgba(255,255,255,0.9)",fontFamily:"'Syne',sans-serif"}}>{s.fn}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:4,fontFamily:"'DM Mono',monospace"}}>{cs} STUDENTS</div>
                </div>
                <div style={{padding:"5px 14px",borderRadius:100,border:`1px solid ${stc}30`,background:`${stc}10`,color:stc,fontSize:10,fontWeight:700,letterSpacing:1.5,fontFamily:"'DM Mono',monospace"}}>{st}</div>
              </div>
              <div style={{display:"flex",alignItems:"end",gap:10,marginBottom:20}}>
                <span style={{fontSize:44,fontWeight:900,color:col,fontFamily:"'Syne',sans-serif",lineHeight:1,letterSpacing:"-0.03em",textShadow:`0 0 20px ${col}25`}}>{s.avg}%</span>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.25)",marginBottom:6,fontFamily:"'DM Mono',monospace"}}>AVG</span>
              </div>
              {/* Mini bar with glow */}
              <div style={{height:6,borderRadius:3,background:"rgba(255,255,255,0.04)",overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,background:`linear-gradient(90deg,${col}cc,${col}66)`,width:`${s.avg}%`,boxShadow:`0 0 12px ${col}40`,transition:"width 1.5s cubic-bezier(0.16,1,0.3,1)"}} />
              </div>
            </TiltCard>
          </SR>;
        })}
      </div>
    </section>

    {/* ===== HOW IT WORKS ===== */}
    <section style={{padding:"80px 20px 120px",maxWidth:900,margin:"0 auto",position:"relative",zIndex:1}}>
      <SR>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{width:40,height:2,background:"linear-gradient(90deg,#ff6b35,transparent)"}} />
          <span style={{fontSize:11,letterSpacing:3,color:"#ff6b35",fontFamily:"'DM Mono',monospace"}}>METHODOLOGY</span>
        </div>
        <h2 style={{fontSize:"clamp(32px,5vw,56px)",fontWeight:800,lineHeight:1.05,fontFamily:"'Syne',sans-serif",marginBottom:48}}>
          The <span style={{color:"#ff6b35",textShadow:"0 0 20px rgba(255,107,53,0.15)"}}>Pipeline</span>
        </h2>
      </SR>

      {/* Connected steps with line */}
      <div style={{position:"relative",paddingLeft:40}}>
        <div style={{position:"absolute",left:15,top:20,bottom:20,width:1,background:"linear-gradient(180deg,#ff6b35,#d946ef,#4cc9f0,#00ff88)"}} />
        {[
          {s:"01",t:"Data Ingestion",d:"19 Excel sheets parsed. 38,091 individual P/A records extracted across 9 subjects from Jul-Nov 2025.",icon:"\uD83D\uDCCA",c:"#ff6b35"},
          {s:"02",t:"Feature Engineering",d:"13 temporal & categorical features: day of week, month, week number, subject averages, class sizes, semester position.",icon:"\u2699\uFE0F",c:"#d946ef"},
          {s:"03",t:"Model Training",d:"Gradient Boosting Regressor (200 trees, depth 5). Subject average is the strongest predictor (46% importance), followed by temporal position (23%).",icon:"\uD83E\uDDE0",c:"#4cc9f0"},
          {s:"04",t:"Service Allocation",d:"Predicted attendance \u00D7 utilization ratios = canteen meals (85%), transport seats (70%), lab stations (60%).",icon:"\uD83D\uDE80",c:"#00ff88"},
        ].map((item,i) => <SR key={i} delay={i*150}>
          <div style={{display:"flex",gap:24,alignItems:"start",marginBottom:40,position:"relative"}}>
            <div style={{minWidth:30,height:30,borderRadius:"50%",background:`${item.c}15`,border:`2px solid ${item.c}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginLeft:-15,position:"relative",zIndex:2}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:item.c,boxShadow:`0 0 8px ${item.c}`}} />
            </div>
            <TiltCard glowColor={item.c+"20"} style={{flex:1,padding:"24px 28px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <span style={{fontSize:22}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:10,color:item.c,fontWeight:700,letterSpacing:2,fontFamily:"'DM Mono',monospace"}}>STEP {item.s}</div>
                  <div style={{fontSize:18,fontWeight:700,fontFamily:"'Syne',sans-serif"}}>{item.t}</div>
                </div>
              </div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.4)",lineHeight:1.7}}>{item.d}</div>
            </TiltCard>
          </div>
        </SR>)}
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{padding:"40px 20px",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.04)",position:"relative",zIndex:1}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:12}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 8px #00ff88"}} />
        <span style={{fontSize:12,letterSpacing:3,color:"rgba(255,255,255,0.3)",fontFamily:"'DM Mono',monospace"}}>ATTENDANCE PREDICTOR v2.0</span>
      </div>
      <div style={{fontSize:13,color:"rgba(255,255,255,0.15)",fontFamily:"'DM Sans',sans-serif"}}>
        IIIT Surat | Gradient Boosting ML | 38K+ Records | 9 Subjects
      </div>
    </footer>
  </div>;
}
