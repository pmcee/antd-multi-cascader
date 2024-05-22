import React, { useState } from 'react'
import { Checkbox } from 'antd'
import { storiesOf } from '@storybook/react'
import MultiCascader from '../index'

storiesOf('MultiCascader', MultiCascader as any).add('Search', () => {
  const [state, setState] = useState<string[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const [options] = useState([
    {
      label: 'search label there',
      title: 'search label there',
      value: 'search label there',
      children: [
        {
          value: 1,
          label: 'is have order',
          title: 'is have order',
          disabled: false,
          children: [
            {
              value: 11,
              label: 'no order',
              title: 'no order',
            },
            {
              value: 12,
              label: 'have order',
              title: 'have order',
            },
          ],
        },
        {
          value: 2,
          label: 'today is sunday',
          title: 'today is sunday',
          disabled: false,
          children: [
            {
              value: 21,
              label: 'yes',
              title: 'yes',
            },
            {
              value: 22,
              label: 'no',
              title: 'no',
            },
          ],
        },
      ],
    },
    {
      label: 'which to be search',
      title: 'which to be search',
      value: 'which to be search',
      children: [
        {
          value: 3,
          label: 'shopping',
          title: 'shopping',
          disabled: false,
          children: [
            {
              value: 31,
              label: 'a',
              title: 'a',
            },
            {
              value: 32,
              label: 'b',
              title: 'b',
            },
            {
              value: 33,
              label: 'tao bao',
              title: 'tao bao',
            },
            {
              value: 34,
              label: 'jing dong',
              title: 'jing dong',
            },
            {
              value: 35,
              label: 'pxx',
              title: 'pxx',
            },
            {
              value: 36,
              label: 'super mao',
              title: 'super mao',
            },
            {
              value: 37,
              label: 'nothing',
              title: 'nothing',
            },
          ],
        },
        {
          value: 4,
          label: 'nick name',
          title: 'nick name',
          disabled: false,
          children: [
            {
              value: 41,
              label: 'lily',
              title: 'lily',
            },
            {
              value: 42,
              label: 'name is tom',
              title: 'name is tom',
            },
            {
              value: 43,
              label: 'is lay here',
              title: 'is lay here',
            },
            {
              value: 44,
              label: 'nobody',
              title: 'nobody',
            },
          ],
        },
      ],
    },
  ])

  const handleChange = (e) => setDisabled(e.target.checked)

  return (
    <>
      <MultiCascader
        selectAll
        data={options as any}
        value={state}
        onChange={setState}
        allowClear
        disabled={disabled}
        placeholder="Default"
        style={{ width: '200px' }}
        showSearch
      />
      <div>
        <Checkbox checked={disabled} onChange={handleChange}>
          Disabled
        </Checkbox>
      </div>
    </>
  )
})
