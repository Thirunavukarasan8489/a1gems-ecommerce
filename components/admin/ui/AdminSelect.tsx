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
        <label className="block text-sm font-medium text-gold-700 dark:text-gold-300">
          {label}
        </label>
      )}
      <Select
        instanceId={props.instanceId || props.name || id}
        unstyled
        className={`w-full ${className || ''}`}
        classNames={{
          control: ({ isFocused, isDisabled }) =>
            `flex items-center justify-between min-h-[42px] px-3 py-1 bg-white dark:bg-gold-950 border rounded-lg text-sm transition-colors ${
              isDisabled
                ? 'opacity-60 bg-gold-100 dark:bg-gold-900 cursor-not-allowed'
                : 'cursor-pointer'
            } ${
              error
                ? 'border-red-500 ring-1 ring-red-500'
                : isFocused
                ? 'border-gold-500 ring-2 ring-gold-500/20'
                : 'border-gold-300 dark:border-gold-700 hover:border-gold-400 dark:hover:border-gold-600'
            }`,
          valueContainer: () => 'flex items-center gap-1.5 flex-wrap text-gold-900 dark:text-gold-100',
          singleValue: () => 'text-gold-900 dark:text-gold-100 text-sm font-normal',
          multiValue: () => 'flex items-center bg-gold-500/15 dark:bg-gold-500/20 text-gold-800 dark:text-gold-300 rounded px-2 py-0.5 text-xs font-medium gap-1 border border-gold-500/30',
          multiValueLabel: () => 'text-gold-800 dark:text-gold-300',
          multiValueRemove: () => 'text-gold-600 hover:text-red-500 cursor-pointer rounded-sm',
          placeholder: () => 'text-gold-400 text-sm',
          input: () => 'text-gold-900 dark:text-gold-100 text-sm',
          menu: () => 'mt-1.5 bg-white dark:bg-gold-900 border border-gold-300 dark:border-gold-800 rounded-lg shadow-lg overflow-hidden z-50 py-1',
          menuList: () => 'max-h-60 overflow-y-auto text-sm',
          option: ({ isFocused, isSelected }) =>
            `px-3 py-2 cursor-pointer transition-colors text-sm ${
              isSelected
                ? 'bg-gold-900 text-gold-100 font-medium'
                : isFocused
                ? 'bg-gold-100 dark:bg-gold-800 text-gold-900 dark:text-gold-100'
                : 'text-gold-800 dark:text-gold-200'
            }`,
          noOptionsMessage: () => 'p-3 text-center text-sm text-gold-400',
          dropdownIndicator: () => 'p-1 text-gold-400 hover:text-gold-600 dark:hover:text-gold-200 cursor-pointer',
          clearIndicator: () => 'p-1 text-gold-400 hover:text-red-500 cursor-pointer',
          indicatorSeparator: () => 'bg-gold-300 dark:bg-gold-700 my-1 mx-1.5 w-px',
        }}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-gold-400 mt-1">{helperText}</p>}
    </div>
  );
}

export default AdminSelect;
