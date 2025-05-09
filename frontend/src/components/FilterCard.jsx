import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { SlidersHorizontal, X } from 'lucide-react';

const filterData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Lucknow"]
  },
  {
    fitlerType: "Industry",
    array: [
      "Construction Worker", "Electrician", "Plumber", "Carpenter", "Painter",
      "Welder", "Mason", "Driver", "Housekeeping Staff", "Security Guard",
      "Gardener", "AC Technician", "Tile Setter", "Heavy Vehicle Operator",
      "Warehouse Labour", "Packaging Staff", "Helper / General Labour",
      "Scaffolder", "Cleaning Staff", "Loader/Unloader"
    ]
  },
  {
    fitlerType: "Charge",
    array: ["0-400", "1k-2k", "3k to 5k"]
  },
];

const FilterCard = ({ isVisible, onClose }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-5 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fadeIn overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-white" />
            <h1 className="text-lg font-semibold text-white">Filter Jobs</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-indigo-800 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(70vh-4rem)] custom-scrollbar">
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-6">
              <h2 className="mb-3 text-xs font-semibold text-indigo-600 uppercase tracking-wider">{data.fitlerType}</h2>
              <div className="space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors duration-200 hover:bg-indigo-50"
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="accent-indigo-600"
                      />
                      <Label
                        htmlFor={itemId}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
