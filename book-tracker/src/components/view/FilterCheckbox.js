import React from 'react';

function FilterCheckbox({ label, checked, onChange, color }) {
    return (
        <label className="label cursor-pointer space-x-2">
            <span className="label-text">{label}</span>
            <input type='checkbox' checked={checked} onChange={onChange} className={`checkbox checkbox-${color}`} />
        </label>
    );
}

export default FilterCheckbox;