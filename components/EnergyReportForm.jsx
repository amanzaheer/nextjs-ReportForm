// pages/form.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EnergyReportForm() {
  const [formData, setFormData] = useState({
    electricityBill: '',
    gasBill: '',
    propaneUsage: '',
    insulation: '',
    windows: '',
    appliances: '',
    roofing: '',
    lighting: '',
    cookingRange: '',
    homeEfficiency: '',
    heatingSystem: '',
    coolingSystem: '',
    solarInterest: false,
    existingSolar: false,
    homeAge: '',
    numberOfOccupants: '',
    thermostatSetting: '',
    waterHeaterType: '',
    waterHeaterAge: '',
    smartThermostat: false,
    energyStarAppliances: false,
    poolPump: false,
    poolPumpUsage: '',
    hvacAge: '',
    airSealing: '',
    atticInsulation: '',
    wallInsulation: '',
    floorInsulation: '',
    ceilingInsulation: '',
    windowType: '',
    doorQuality: '',
    ventilationSystem: '',
    // Add more fields as necessary...
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push({
      pathname: '/report',
      query: formData,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Energy Report Form</h1>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Average Monthly Electricity Bill ($)" name="electricityBill" type="number" value={formData.electricityBill} onChange={handleChange} />
          <InputField label="Monthly Gas Bill ($)" name="gasBill" type="number" value={formData.gasBill} onChange={handleChange} />
          <InputField label="Monthly Propane Usage (Gallons)" name="propaneUsage" type="number" value={formData.propaneUsage} onChange={handleChange} />
          <InputField label="Current Insulation Quality (1-10)" name="insulation" type="number" min="1" max="10" value={formData.insulation} onChange={handleChange} />
          <InputField label="Quality of Windows (1-10)" name="windows" type="number" min="1" max="10" value={formData.windows} onChange={handleChange} />
          <InputField label="Home Efficiency Rating (1-10)" name="homeEfficiency" type="number" min="1" max="10" value={formData.homeEfficiency} onChange={handleChange} />
          <InputField label="Roofing Quality (1-10)" name="roofing" type="number" min="1" max="10" value={formData.roofing} onChange={handleChange} />
          <InputField label="Lighting Efficiency (1-10)" name="lighting" type="number" min="1" max="10" value={formData.lighting} onChange={handleChange} />
          <InputField label="Age of Home (years)" name="homeAge" type="number" value={formData.homeAge} onChange={handleChange} />
          <InputField label="Number of Occupants" name="numberOfOccupants" type="number" value={formData.numberOfOccupants} onChange={handleChange} />
          <InputField label="Thermostat Setting (°F)" name="thermostatSetting" type="number" value={formData.thermostatSetting} onChange={handleChange} />
          <InputField label="Water Heater Type" name="waterHeaterType" type="text" value={formData.waterHeaterType} onChange={handleChange} />
          <InputField label="Water Heater Age (years)" name="waterHeaterAge" type="number" value={formData.waterHeaterAge} onChange={handleChange} />
          <CheckboxField label="Do you have a smart thermostat?" name="smartThermostat" checked={formData.smartThermostat} onChange={handleChange} />
          <CheckboxField label="Do you have Energy Star-rated appliances?" name="energyStarAppliances" checked={formData.energyStarAppliances} onChange={handleChange} />
          <CheckboxField label="Do you have a pool pump?" name="poolPump" checked={formData.poolPump} onChange={handleChange} />
          <InputField label="Pool Pump Usage (hours/week)" name="poolPumpUsage" type="number" value={formData.poolPumpUsage} onChange={handleChange} />
          <InputField label="Age of HVAC System (years)" name="hvacAge" type="number" value={formData.hvacAge} onChange={handleChange} />
          <InputField label="Air Sealing Quality (1-10)" name="airSealing" type="number" min="1" max="10" value={formData.airSealing} onChange={handleChange} />
          <InputField label="Attic Insulation Quality (1-10)" name="atticInsulation" type="number" min="1" max="10" value={formData.atticInsulation} onChange={handleChange} />
          <InputField label="Wall Insulation Quality (1-10)" name="wallInsulation" type="number" min="1" max="10" value={formData.wallInsulation} onChange={handleChange} />
          <InputField label="Floor Insulation Quality (1-10)" name="floorInsulation" type="number" min="1" max="10" value={formData.floorInsulation} onChange={handleChange} />
          <InputField label="Ceiling Insulation Quality (1-10)" name="ceilingInsulation" type="number" min="1" max="10" value={formData.ceilingInsulation} onChange={handleChange} />
          <InputField label="Window Type" name="windowType" type="text" value={formData.windowType} onChange={handleChange} />
          <InputField label="Door Quality (1-10)" name="doorQuality" type="number" min="1" max="10" value={formData.doorQuality} onChange={handleChange} />
          <InputField label="Ventilation System Quality (1-10)" name="ventilationSystem" type="number" min="1" max="10" value={formData.ventilationSystem} onChange={handleChange} />
          <CheckboxField label="Are you interested in solar installation?" name="solarInterest" checked={formData.solarInterest} onChange={handleChange} />
          <CheckboxField label="Do you have an existing solar system?" name="existingSolar" checked={formData.existingSolar} onChange={handleChange} />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md w-full mt-6">
          Generate Report
        </button>
      </form>
    </div>
  );
}

function InputField({ label, name, type, value, checked, onChange, min, max }) {
  return (
    <div className="mb-4 col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        min={min}
        max={max}
        className="mt-1 block w-full py-2 bg-gray-100 rounded-md border-gray-500 shadow-sm focus:border-green-500 focus:ring-green-500"
      />
    </div>
  );
}

function CheckboxField({ label, name, checked, onChange }) {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-green-600 border-gray-300 rounded"
      />
      <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
    </div>
  );
}
