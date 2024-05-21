import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TreeNode } from '../index.d'
import { Props } from './MultiCascader'
import MultiCascader from '../container'
import { prefix } from '../constants'
import MenuItem from './MenuItem'
import { Input } from 'antd'

const { Search } = Input

const Column = (props: {
  item: TreeNode[]
  columnWidth?: number
  depth: number
  showSearch?: boolean
  searchInputPlaceholder?: string | string[]
}) => {
  const { item, columnWidth, depth, showSearch, searchInputPlaceholder } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(columnWidth)
  const { searchWords, setSearchWords } = MultiCascader.useContainer()

  // 固定宽度，避免切换时菜单跳动的问题
  useEffect(() => {
    const { width: refWidth } = ref.current!.getBoundingClientRect()
    setWidth(refWidth)
  }, [])

  const searchWord = useMemo(() => {
    return searchWords[depth] || ''
  }, [depth, searchWords])

  const renderItem = useMemo(() => {
    return item.filter((i) =>
      i.title?.toString().toLowerCase().includes(searchWord.toLowerCase())
    )
  }, [item, searchWord])

  const handleSearch = (v: string) => {
    const newSearchWords = [...searchWords]
    newSearchWords[depth] = v
    setSearchWords(newSearchWords)
  }

  const inputPlaceholder = useMemo(() => {
    return searchInputPlaceholder
      ? typeof searchInputPlaceholder === 'string'
        ? searchInputPlaceholder
        : searchInputPlaceholder[depth] || ''
      : 'Input Search Text'
  }, [searchInputPlaceholder, depth])

  return (
    <div
      className={`${prefix}-column-container`}
      style={{ width: `${columnWidth || width}px` }}
      ref={ref}
    >
      {showSearch && (
        <Search
          placeholder={inputPlaceholder}
          className={`${prefix}-column-input`}
          allowClear
          onSearch={handleSearch}
        />
      )}
      <div className={`${prefix}-column`}>
        <ul>
          {renderItem.map((node: TreeNode) => {
            return (
              <MenuItem key={node.value.toString()} depth={depth} node={node} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default (props: Props) => {
  const { columnWidth, showSearch, searchInputPlaceholder } = props
  const { menuData } = MultiCascader.useContainer()

  return (
    <div className={`${prefix}-menu`}>
      {menuData.map((item, index) => {
        return (
          <Column
            item={item}
            columnWidth={columnWidth}
            depth={index}
            key={item[0]?.value || index}
            showSearch={showSearch}
            searchInputPlaceholder={searchInputPlaceholder}
          />
        )
      })}
    </div>
  )
}
