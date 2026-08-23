'use client';

import React, { useId } from 'react';
import Select, { Props as SelectProps, GroupBase } from 'react-select';

export interface AdminSelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

interface AdminSelectCustomProps<
  Option = AdminSelectOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends SelectProps<Option, IsMulti, Group> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function AdminSelect<
  Option = AdminSelectOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  error,
  helperText,
  className,
  ...props
}: AdminSelectCustomProps<Option, IsMulti, Group>) {
  const id = useId();

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <Select
        instanceId={props.instanceId || props.name || id}
        unstyled
        className={`w-full ${className || ''}`}
        classNames={{
          control: ({ isFocused, isDisabled }) =>
            `flex items-center justify-between min-h-[42px] px-3 py-1 bg-white dark:bg-slate-900 border rounded-lg text-sm transition-colors ${
              isDisabled
                ? 'opacity-60 bg-slate-100 dark:bg-slate-800 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              error
                ? 'border-red-500 ring-1 ring-red-500'
                : isFocused
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`,
          valueContainer: () => 'flex items-center gap-1.5 flex-wrap text-slate-800 dark:text-slate-100',
          singleValue: () => 'text-slate-800 dark:text-slate-100 text-sm font-normal',
          multiValue: () => 'flex items-center bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded px-2 py-0.5 text-xs font-medium gap-1',
          multiValueLabel: () => 'text-blue-700 dark:text-blue-300',
          multiValueRemove: () => 'text-blue-500 hover:text-blue-700 dark:hover:text-blue-200 cursor-pointer rounded-sm',
          placeholder: () => 'text-slate-400 text-sm',
          input: () => 'text-slate-800 dark:text-slate-100 text-sm',
          menu: () => 'mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg overflow-hidden z-50 py-1',
          menuList: () => 'max-h-60 overflow-y-auto text-sm',
          option: ({ isFocused, isSelected }) =>
            `px-3 py-2 cursor-pointer transition-colors text-sm ${
              isSelected
                ? 'bg-blue-600 text-white font-medium'
                : isFocused
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-700 dark:text-slate-300'
            }`,
          noOptionsMessage: () => 'p-3 text-center text-sm text-slate-400',
          dropdownIndicator: () => 'p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer',
          clearIndicator: () => 'p-1 text-slate-400 hover:text-red-500 cursor-pointer',
          indicatorSeparator: () => 'bg-slate-200 dark:bg-slate-700 my-1 mx-1.5 w-px',
        }}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}

export default AdminSelect;
