"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
import { Edit3, Check, X, Trash2, Copy } from "lucide-react"

interface EditableTextProps {
  children: React.ReactNode
  value: string
  onUpdate: (newValue: string) => void
  onDelete?: () => void
  onDuplicate?: () => void
  multiline?: boolean
  placeholder?: string
  className?: string
  elementId?: string
}

export function EditableText({ 
  children, 
  value, 
  onUpdate, 
  onDelete, 
  onDuplicate, 
  multiline = false, 
  placeholder = "Editar texto...",
  className = "",
  elementId = ""
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [showControls, setShowControls] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    onUpdate(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
    if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault()
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <span className="relative inline-block align-baseline min-w-[200px]">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[80px] resize-none"
            placeholder={placeholder}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-[200px]"
            placeholder={placeholder}
          />
        )}
        <span className="flex gap-1 mt-1">
          <span
            role="button"
            aria-label="Guardar"
            tabIndex={0}
            onClick={handleSave}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSave()}
            className="h-6 w-6 p-0 inline-flex items-center justify-center rounded hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
          >
            <Check className="h-3 w-3" />
          </span>
          <span
            role="button"
            aria-label="Cancelar"
            tabIndex={0}
            onClick={handleCancel}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCancel()}
            className="h-6 w-6 p-0 inline-flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </span>
        </span>
      </span>
    )
  }

  return (
    <span 
      className={`relative inline-block align-baseline group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      data-element-id={elementId}
    >
      <span 
        className="cursor-text hover:bg-blue-50/50 dark:hover:bg-blue-950/20 rounded px-1 py-0.5 transition-colors"
        onDoubleClick={(e) => {
          e.stopPropagation()
          setIsEditing(true)
        }}
        title="Doble clic para editar"
      >
        {children}
      </span>

      {showControls && (
        <span className="absolute -top-8 left-0 z-50 flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            role="button"
            aria-label="Editar"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              setIsEditing(true)
            }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setIsEditing(true) } }}
            className="h-6 w-6 p-0 inline-flex items-center justify-center rounded hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
            title="Editar (o doble clic)"
          >
            <Edit3 className="h-3 w-3" />
          </span>
          
          {onDuplicate && (
            <span
              role="button"
              aria-label="Duplicar"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onDuplicate() }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onDuplicate?.() } }}
              className="h-6 w-6 p-0 inline-flex items-center justify-center rounded hover:bg-green-100 dark:hover:bg-green-900 cursor-pointer"
              title="Duplicar"
            >
              <Copy className="h-3 w-3" />
            </span>
          )}
          
          {onDelete && (
            <span
              role="button"
              aria-label="Eliminar"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onDelete() }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onDelete?.() } }}
              className="h-6 w-6 p-0 inline-flex items-center justify-center rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 cursor-pointer"
              title="Eliminar"
            >
              <Trash2 className="h-3 w-3" />
            </span>
          )}
        </span>
      )}

      {showControls && (
        <span className="absolute inset-0 border-2 border-blue-400 dark:border-blue-600 rounded pointer-events-none" />
      )}
    </span>
  )
}

// Hook para manejar elementos editables
export function useEditableContent(initialContent: string) {
  const [content, setContent] = useState(initialContent)
  
  const updateContent = (newContent: string) => {
    setContent(newContent)
  }
  
  return { content, updateContent }
}