import React from 'react';

function FilterCheckbox({ label, checked, onChange, color }) {
    return (
        <label className="label cursor-pointer space-x-2">
            <span className="label-text">{label}</span>
            <input type='checkbox' className={'checkbox ' + color} checked={checked} onChange={onChange} />
        </label>
    );
}

export default FilterCheckbox;