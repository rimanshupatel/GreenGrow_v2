import React, { useState } from 'react';
import { ChevronDown, Thermometer, Droplets, AlertTriangle, CheckCircle, Download, Phone } from 'lucide-react';

const SmartStorageAdvisor = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    productionAmount: '',
    location: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    storageInfra: '',
    harvestStage: '',
    storageDuration: ''
  });

  const [recommendations, setRecommendations] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const cropTypes = ['Rice', 'Wheat', 'Maize', 'Pulses', 'Cotton', 'Sugarcane', 'Potatoes', 'Onions', 'Tomatoes'];
  const states = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Gujarat'];
  const storageOptions = ['Traditional Storage', 'Metal Silos', 'Cold Storage', 'Warehouse', 'On-farm Storage'];
  const harvestStages = ['Just Harvested', 'Partially Dried', 'Fully Dried', 'Processed'];
  const durations = ['Short-term (1-3 months)', 'Medium-term (3-6 months)', 'Long-term (6+ months)'];

  const generateRecommendations = () => {
    // Simulated AI recommendation logic
    const tempNum = parseFloat(formData.temperature) || 25;
    const humidityNum = parseFloat(formData.humidity) || 60;
    
    let method = 'Metal Silos';
    let guidance = 'Standard storage conditions recommended';
    let packaging = 'Jute bags with plastic lining';
    
    if (formData.cropType === 'Potatoes' || formData.cropType === 'Tomatoes') {
      method = 'Cold Storage';
      packaging = 'Ventilated crates';
    } else if (humidityNum > 70) {
      guidance = 'High humidity detected - ensure proper drying before storage';
      method = 'Solar-powered dryers + Hermetic bags';
    }
    
    const confidenceScore = Math.min(95, 70 + Math.random() * 25);
    setConfidence(confidenceScore);
    
    setRecommendations({
      method,
      guidance,
      packaging,
      temperature: formData.cropType === 'Potatoes' ? '2-4°C' : '15-20°C',
      humidity: formData.cropType === 'Rice' ? '12-14%' : '10-12%',
      pestPrevention: 'Use neem-based organic pesticides and ensure clean storage area',
      energy: humidityNum > 70 ? 'Solar drying recommended for energy efficiency' : 'Standard ventilation sufficient'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">🌾 Smart Storage Advisor</h1>
          <p className="text-lg text-gray-600">AI-powered storage guidance for better crop preservation</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Farm & Crop Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                >
                  <option value="">Select Crop Type</option>
                  {cropTypes.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Production (kg)</label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="1000"
                    value={formData.productionAmount}
                    onChange={(e) => handleInputChange('productionAmount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Region</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  >
                    <option value="">Select State</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="25"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Humidity (%)</label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="60"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rainfall (mm)</label>
                  <input 
                    type="number" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="50"
                    value={formData.rainfall}
                    onChange={(e) => handleInputChange('rainfall', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Storage Infrastructure</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={formData.storageInfra}
                  onChange={(e) => handleInputChange('storageInfra', e.target.value)}
                >
                  <option value="">Select Infrastructure</option>
                  {storageOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Stage</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.harvestStage}
                    onChange={(e) => handleInputChange('harvestStage', e.target.value)}
                  >
                    <option value="">Select Stage</option>
                    {harvestStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Duration</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.storageDuration}
                    onChange={(e) => handleInputChange('storageDuration', e.target.value)}
                  >
                    <option value="">Select Duration</option>
                    {durations.map(duration => <option key={duration} value={duration}>{duration}</option>)}
                  </select>
                </div>
              </div>

              <button 
                onClick={generateRecommendations}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
              >
                Get Smart Storage Plan
              </button>
            </div>
          </div>

          {/* Recommendations Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Recommendations</h2>
            
            {!recommendations ? (
              <div className="text-center text-gray-500 py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-gray-400" />
                </div>
                <p>Fill in your crop details to get personalized storage recommendations</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Confidence Score */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">AI Confidence Level</span>
                    <span className="text-2xl font-bold text-green-600">{confidence.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: `${confidence}%`}}></div>
                  </div>
                </div>

                {/* Main Recommendation */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Recommended Storage Method</h3>
                  <p className="text-lg text-blue-600 font-medium">{recommendations.method}</p>
                  <p className="text-sm text-gray-600 mt-1">{recommendations.guidance}</p>
                </div>

                {/* Storage Conditions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Optimal Temperature</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-600">{recommendations.temperature}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Moisture Content</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-600">{recommendations.humidity}</p>
                  </div>
                </div>

                {/* Additional Recommendations */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Packaging Advice</h4>
                      <p className="text-sm text-gray-600">{recommendations.packaging}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Pest Prevention</h4>
                      <p className="text-sm text-gray-600">{recommendations.pestPrevention}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Energy Efficiency</h4>
                      <p className="text-sm text-gray-600">{recommendations.energy}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    Expert Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Storage Tips</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Before Storage</h4>
              <p className="text-yellow-700">Ensure crops are properly dried and cleaned to prevent mold and pest infestation</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">During Storage</h4>
              <p className="text-blue-700">Monitor temperature and humidity regularly using IoT sensors or manual checks</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Government Support</h4>
              <p className="text-green-700">Check for subsidies on storage infrastructure and cold chain facilities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartStorageAdvisor;