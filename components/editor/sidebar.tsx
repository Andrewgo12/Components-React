"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as Icons from "@/components/icons"
import { useState } from "react"

interface SidebarProps {
  onAddComponent: (type: string) => void
}

const basicComponents = [
  // Core UI Elements (20)
  { id: "button", name: "Botón", icon: Icons.MousePointerIcon, color: "from-blue-500 to-blue-600" },
  { id: "input", name: "Input", icon: Icons.TypeIcon, color: "from-purple-500 to-purple-600" },
  { id: "card", name: "Card", icon: Icons.SquareIcon, color: "from-green-500 to-green-600" },
  { id: "badge", name: "Badge", icon: Icons.CircleIcon, color: "from-orange-500 to-orange-600" },
  { id: "text", name: "Texto", icon: Icons.FileTextIcon, color: "from-pink-500 to-pink-600" },
  { id: "image", name: "Imagen", icon: Icons.ImageIcon, color: "from-cyan-500 to-cyan-600" },
  { id: "checkbox", name: "Checkbox", icon: Icons.CheckIcon, color: "from-green-500 to-emerald-600" },
  { id: "radio", name: "Radio", icon: Icons.CircleIcon, color: "from-blue-500 to-indigo-600" },
  { id: "toggle", name: "Toggle", icon: Icons.ToggleIcon, color: "from-purple-500 to-violet-600" },
  { id: "slider", name: "Slider", icon: Icons.SlidersIcon, color: "from-orange-500 to-red-600" },
  { id: "avatar", name: "Avatar", icon: Icons.UserIcon, color: "from-pink-500 to-rose-600" },
  { id: "divider", name: "Divider", icon: Icons.MinusIcon, color: "from-gray-500 to-slate-600" },
  { id: "textarea", name: "Textarea", icon: Icons.FileTextIcon, color: "from-indigo-500 to-blue-600" },
  { id: "select", name: "Select", icon: Icons.ChevronDownIcon, color: "from-teal-500 to-cyan-600" },
  { id: "progress", name: "Progress", icon: Icons.LoaderIcon, color: "from-emerald-500 to-green-600" },
  { id: "alert", name: "Alert", icon: Icons.InfoIcon, color: "from-yellow-500 to-amber-600" },
  { id: "tooltip", name: "Tooltip", icon: Icons.InfoIcon, color: "from-violet-500 to-purple-600" },
  { id: "breadcrumb", name: "Breadcrumb", icon: Icons.ChevronRightIcon, color: "from-slate-500 to-gray-600" },
  { id: "pagination", name: "Pagination", icon: Icons.ChevronRightIcon, color: "from-blue-500 to-indigo-600" },
  { id: "tabs", name: "Tabs", icon: Icons.LayersIcon, color: "from-purple-500 to-pink-600" },
  
  // Form Elements (20)
  { id: "form", name: "Form", icon: Icons.FileTextIcon, color: "from-blue-400 to-blue-500" },
  { id: "fieldset", name: "Fieldset", icon: Icons.SquareIcon, color: "from-purple-400 to-purple-500" },
  { id: "label", name: "Label", icon: Icons.TypeIcon, color: "from-green-400 to-green-500" },
  { id: "input-number", name: "Number", icon: Icons.ChartIcon, color: "from-orange-400 to-orange-500" },
  { id: "input-email", name: "Email", icon: Icons.MailIcon, color: "from-pink-400 to-pink-500" },
  { id: "input-password", name: "Password", icon: Icons.LockIcon, color: "from-cyan-400 to-cyan-500" },
  { id: "input-search", name: "Search", icon: Icons.SearchIcon, color: "from-emerald-400 to-emerald-500" },
  { id: "input-url", name: "URL", icon: Icons.ChevronRightIcon, color: "from-indigo-400 to-indigo-500" },
  { id: "input-tel", name: "Teléfono", icon: Icons.BellIcon, color: "from-violet-400 to-violet-500" },
  { id: "input-date", name: "Fecha", icon: Icons.ChevronDownIcon, color: "from-slate-400 to-slate-500" },
  { id: "input-time", name: "Hora", icon: Icons.LoaderIcon, color: "from-gray-400 to-gray-500" },
  { id: "input-file", name: "Archivo", icon: Icons.FolderIcon, color: "from-yellow-400 to-yellow-500" },
  { id: "input-range", name: "Rango", icon: Icons.SlidersIcon, color: "from-red-400 to-red-500" },
  { id: "input-color", name: "Color", icon: Icons.PaletteIcon, color: "from-teal-400 to-teal-500" },
  { id: "datalist", name: "Datalist", icon: Icons.ChevronDownIcon, color: "from-amber-400 to-amber-500" },
  { id: "optgroup", name: "Optgroup", icon: Icons.LayersIcon, color: "from-rose-400 to-rose-500" },
  { id: "option", name: "Option", icon: Icons.CircleIcon, color: "from-lime-400 to-lime-500" },
  { id: "button-submit", name: "Submit", icon: Icons.CheckIcon, color: "from-green-600 to-emerald-600" },
  { id: "button-reset", name: "Reset", icon: Icons.XIcon, color: "from-red-600 to-pink-600" },
  { id: "button-button", name: "Button", icon: Icons.MousePointerIcon, color: "from-blue-600 to-indigo-600" },
  
  // Layout Elements (20)
  { id: "container", name: "Container", icon: Icons.SquareIcon, color: "from-blue-300 to-blue-400" },
  { id: "section", name: "Section", icon: Icons.LayersIcon, color: "from-purple-300 to-purple-400" },
  { id: "article", name: "Article", icon: Icons.FileTextIcon, color: "from-green-300 to-green-400" },
  { id: "aside", name: "Aside", icon: Icons.SquareIcon, color: "from-orange-300 to-orange-400" },
  { id: "header", name: "Header", icon: Icons.MinusIcon, color: "from-pink-300 to-pink-400" },
  { id: "footer", name: "Footer", icon: Icons.MinusIcon, color: "from-cyan-300 to-cyan-400" },
  { id: "main", name: "Main", icon: Icons.SquareIcon, color: "from-emerald-300 to-emerald-400" },
  { id: "nav", name: "Nav", icon: Icons.ChevronRightIcon, color: "from-indigo-300 to-indigo-400" },
  { id: "div", name: "Div", icon: Icons.SquareIcon, color: "from-violet-300 to-violet-400" },
  { id: "span", name: "Span", icon: Icons.TypeIcon, color: "from-slate-300 to-slate-400" },
  { id: "grid", name: "Grid", icon: Icons.GridIcon, color: "from-gray-300 to-gray-400" },
  { id: "flex", name: "Flex", icon: Icons.LayersIcon, color: "from-yellow-300 to-yellow-400" },
  { id: "box", name: "Box", icon: Icons.SquareIcon, color: "from-red-300 to-red-400" },
  { id: "stack", name: "Stack", icon: Icons.LayersIcon, color: "from-teal-300 to-teal-400" },
  { id: "wrap", name: "Wrap", icon: Icons.SquareIcon, color: "from-amber-300 to-amber-400" },
  { id: "center", name: "Center", icon: Icons.CircleIcon, color: "from-rose-300 to-rose-400" },
  { id: "spacer", name: "Spacer", icon: Icons.MinusIcon, color: "from-lime-300 to-lime-400" },
  { id: "separator", name: "Separator", icon: Icons.MinusIcon, color: "from-sky-300 to-sky-400" },
  { id: "group", name: "Group", icon: Icons.LayersIcon, color: "from-fuchsia-300 to-fuchsia-400" },
  { id: "panel", name: "Panel", icon: Icons.SquareIcon, color: "from-emerald-600 to-teal-600" },
  
  // Typography (20)
  { id: "h1", name: "H1", icon: Icons.TypeIcon, color: "from-blue-200 to-blue-300" },
  { id: "h2", name: "H2", icon: Icons.TypeIcon, color: "from-purple-200 to-purple-300" },
  { id: "h3", name: "H3", icon: Icons.TypeIcon, color: "from-green-200 to-green-300" },
  { id: "h4", name: "H4", icon: Icons.TypeIcon, color: "from-orange-200 to-orange-300" },
  { id: "h5", name: "H5", icon: Icons.TypeIcon, color: "from-pink-200 to-pink-300" },
  { id: "h6", name: "H6", icon: Icons.TypeIcon, color: "from-cyan-200 to-cyan-300" },
  { id: "paragraph", name: "Paragraph", icon: Icons.FileTextIcon, color: "from-emerald-200 to-emerald-300" },
  { id: "strong", name: "Strong", icon: Icons.TypeIcon, color: "from-indigo-200 to-indigo-300" },
  { id: "em", name: "Emphasis", icon: Icons.TypeIcon, color: "from-violet-200 to-violet-300" },
  { id: "small", name: "Small", icon: Icons.TypeIcon, color: "from-slate-200 to-slate-300" },
  { id: "mark", name: "Mark", icon: Icons.TypeIcon, color: "from-yellow-200 to-yellow-300" },
  { id: "del", name: "Delete", icon: Icons.TypeIcon, color: "from-red-200 to-red-300" },
  { id: "ins", name: "Insert", icon: Icons.TypeIcon, color: "from-teal-200 to-teal-300" },
  { id: "sub", name: "Subscript", icon: Icons.TypeIcon, color: "from-amber-200 to-amber-300" },
  { id: "sup", name: "Superscript", icon: Icons.TypeIcon, color: "from-rose-200 to-rose-300" },
  { id: "code", name: "Code", icon: Icons.CodeIcon, color: "from-lime-200 to-lime-300" },
  { id: "pre", name: "Preformat", icon: Icons.CodeIcon, color: "from-sky-200 to-sky-300" },
  { id: "kbd", name: "Keyboard", icon: Icons.KeyboardIcon, color: "from-fuchsia-200 to-fuchsia-300" },
  { id: "samp", name: "Sample", icon: Icons.CodeIcon, color: "from-orange-600 to-red-600" },
  { id: "var", name: "Variable", icon: Icons.CodeIcon, color: "from-purple-600 to-pink-600" },
  
  // Media & Interactive (20)
  { id: "video", name: "Video", icon: Icons.PlayIcon, color: "from-blue-100 to-blue-200" },
  { id: "audio", name: "Audio", icon: Icons.WavesIcon, color: "from-purple-100 to-purple-200" },
  { id: "canvas", name: "Canvas", icon: Icons.PaletteIcon, color: "from-green-100 to-green-200" },
  { id: "svg", name: "SVG", icon: Icons.SparklesIcon, color: "from-orange-100 to-orange-200" },
  { id: "iframe", name: "Iframe", icon: Icons.SquareIcon, color: "from-pink-100 to-pink-200" },
  { id: "embed", name: "Embed", icon: Icons.SquareIcon, color: "from-cyan-100 to-cyan-200" },
  { id: "object", name: "Object", icon: Icons.SquareIcon, color: "from-emerald-100 to-emerald-200" },
  { id: "param", name: "Param", icon: Icons.SettingsIcon, color: "from-indigo-100 to-indigo-200" },
  { id: "source", name: "Source", icon: Icons.ImageIcon, color: "from-violet-100 to-violet-200" },
  { id: "track", name: "Track", icon: Icons.WavesIcon, color: "from-slate-100 to-slate-200" },
  { id: "map", name: "Map", icon: Icons.ImageIcon, color: "from-yellow-100 to-yellow-200" },
  { id: "area", name: "Area", icon: Icons.SquareIcon, color: "from-red-100 to-red-200" },
  { id: "picture", name: "Picture", icon: Icons.ImageIcon, color: "from-teal-100 to-teal-200" },
  { id: "figure", name: "Figure", icon: Icons.ImageIcon, color: "from-amber-100 to-amber-200" },
  { id: "figcaption", name: "Caption", icon: Icons.TypeIcon, color: "from-rose-100 to-rose-200" },
  { id: "details", name: "Details", icon: Icons.ChevronDownIcon, color: "from-lime-100 to-lime-200" },
  { id: "summary", name: "Summary", icon: Icons.TypeIcon, color: "from-sky-100 to-sky-200" },
  { id: "dialog", name: "Dialog", icon: Icons.SquareIcon, color: "from-fuchsia-100 to-fuchsia-200" },
  { id: "menu", name: "Menu", icon: Icons.LayersIcon, color: "from-indigo-600 to-purple-600" },
  { id: "menuitem", name: "MenuItem", icon: Icons.CircleIcon, color: "from-green-600 to-teal-600" }
]

const magicUIComponents = [
  // Animated Buttons (20)
  { id: "glow-button", name: "Botón Glow", icon: Icons.ZapIcon, color: "from-yellow-500 via-orange-500 to-red-500" },
  { id: "shimmer-button", name: "Shimmer", icon: Icons.SparklesIcon, color: "from-pink-500 via-purple-500 to-indigo-500" },
  { id: "ripple-button", name: "Ripple", icon: Icons.WavesIcon, color: "from-cyan-500 via-blue-500 to-indigo-500" },
  { id: "floating-button", name: "Botón Flotante", icon: Icons.MousePointerIcon, color: "from-blue-500 via-cyan-500 to-teal-500" },
  { id: "scale-button", name: "Scale Button", icon: Icons.MousePointerIcon, color: "from-teal-500 via-cyan-500 to-blue-500" },
  { id: "particle-button", name: "Particle Button", icon: Icons.SparklesIcon, color: "from-blue-500 via-indigo-500 to-purple-500" },
  { id: "magnetic-button", name: "Magnetic", icon: Icons.MousePointerIcon, color: "from-red-500 via-pink-500 to-purple-500" },
  { id: "liquid-button", name: "Liquid", icon: Icons.WavesIcon, color: "from-blue-400 via-cyan-400 to-teal-400" },
  { id: "neon-button", name: "Neon", icon: Icons.ZapIcon, color: "from-pink-400 via-purple-400 to-indigo-400" },
  { id: "hologram-button", name: "Hologram", icon: Icons.SparklesIcon, color: "from-cyan-400 via-blue-400 to-purple-400" },
  { id: "morph-button", name: "Morph", icon: Icons.CircleIcon, color: "from-green-400 via-teal-400 to-cyan-400" },
  { id: "elastic-button", name: "Elastic", icon: Icons.MousePointerIcon, color: "from-orange-400 via-red-400 to-pink-400" },
  { id: "wave-button", name: "Wave", icon: Icons.WavesIcon, color: "from-indigo-400 via-purple-400 to-pink-400" },
  { id: "pulse-button", name: "Pulse", icon: Icons.CircleIcon, color: "from-red-400 via-orange-400 to-yellow-400" },
  { id: "glitch-button", name: "Glitch", icon: Icons.ZapIcon, color: "from-purple-400 via-pink-400 to-red-400" },
  { id: "crystal-button", name: "Crystal", icon: Icons.SparklesIcon, color: "from-cyan-300 via-blue-300 to-indigo-300" },
  { id: "plasma-button", name: "Plasma", icon: Icons.ZapIcon, color: "from-pink-300 via-purple-300 to-indigo-300" },
  { id: "aurora-button", name: "Aurora", icon: Icons.SparklesIcon, color: "from-green-300 via-teal-300 to-cyan-300" },
  { id: "meteor-button", name: "Meteor", icon: Icons.StarIcon, color: "from-orange-300 via-red-300 to-pink-300" },
  { id: "quantum-button", name: "Quantum", icon: Icons.SparklesIcon, color: "from-violet-300 via-purple-300 to-indigo-300" },
  
  // Animated Cards (20)
  { id: "glass-card", name: "Glass Card", icon: Icons.SquareIcon, color: "from-blue-400 via-cyan-400 to-teal-400" },
  { id: "animated-card", name: "Card Animada", icon: Icons.SparklesIcon, color: "from-purple-500 via-pink-500 to-red-500" },
  { id: "bounce-card", name: "Bounce Card", icon: Icons.SquareIcon, color: "from-green-500 via-emerald-500 to-teal-500" },
  { id: "fade-card", name: "Fade Card", icon: Icons.SquareIcon, color: "from-gray-500 via-slate-500 to-zinc-500" },
  { id: "flip-card", name: "Flip Card", icon: Icons.SquareIcon, color: "from-violet-500 via-purple-500 to-indigo-500" },
  { id: "tilt-card", name: "Tilt Card", icon: Icons.SquareIcon, color: "from-blue-300 via-indigo-300 to-purple-300" },
  { id: "hover-card", name: "Hover Card", icon: Icons.SquareIcon, color: "from-green-300 via-emerald-300 to-teal-300" },
  { id: "reveal-card", name: "Reveal Card", icon: Icons.SquareIcon, color: "from-orange-300 via-red-300 to-pink-300" },
  { id: "stack-card", name: "Stack Card", icon: Icons.LayersIcon, color: "from-purple-300 via-violet-300 to-indigo-300" },
  { id: "slide-card", name: "Slide Card", icon: Icons.SquareIcon, color: "from-cyan-300 via-blue-300 to-indigo-300" },
  { id: "expand-card", name: "Expand Card", icon: Icons.SquareIcon, color: "from-pink-300 via-rose-300 to-red-300" },
  { id: "rotate-card", name: "Rotate Card", icon: Icons.LoaderIcon, color: "from-yellow-300 via-orange-300 to-red-300" },
  { id: "parallax-card", name: "Parallax Card", icon: Icons.LayersIcon, color: "from-teal-300 via-cyan-300 to-blue-300" },
  { id: "magnetic-card", name: "Magnetic Card", icon: Icons.SquareIcon, color: "from-indigo-300 via-purple-300 to-pink-300" },
  { id: "liquid-card", name: "Liquid Card", icon: Icons.WavesIcon, color: "from-blue-200 via-cyan-200 to-teal-200" },
  { id: "neon-card", name: "Neon Card", icon: Icons.ZapIcon, color: "from-pink-200 via-purple-200 to-indigo-200" },
  { id: "hologram-card", name: "Hologram Card", icon: Icons.SparklesIcon, color: "from-cyan-200 via-blue-200 to-purple-200" },
  { id: "crystal-card", name: "Crystal Card", icon: Icons.SparklesIcon, color: "from-green-200 via-teal-200 to-cyan-200" },
  { id: "plasma-card", name: "Plasma Card", icon: Icons.ZapIcon, color: "from-orange-200 via-red-200 to-pink-200" },
  { id: "aurora-card", name: "Aurora Card", icon: Icons.SparklesIcon, color: "from-purple-200 via-violet-200 to-indigo-200" },
  
  // Animated Text (20)
  { id: "gradient-text", name: "Texto Gradiente", icon: Icons.PaletteIcon, color: "from-blue-500 via-purple-500 to-pink-500" },
  { id: "typewriter-text", name: "Typewriter", icon: Icons.TypeIcon, color: "from-green-500 via-teal-500 to-cyan-500" },
  { id: "marquee-text", name: "Marquee", icon: Icons.MoveIcon, color: "from-orange-500 via-red-500 to-pink-500" },
  { id: "slide-text", name: "Slide Text", icon: Icons.FileTextIcon, color: "from-yellow-500 via-orange-500 to-red-500" },
  { id: "glow-text", name: "Glow Text", icon: Icons.TypeIcon, color: "from-pink-500 via-rose-500 to-red-500" },
  { id: "neon-text", name: "Neon Text", icon: Icons.ZapIcon, color: "from-cyan-400 via-blue-400 to-purple-400" },
  { id: "glitch-text", name: "Glitch Text", icon: Icons.ZapIcon, color: "from-red-400 via-pink-400 to-purple-400" },
  { id: "wave-text", name: "Wave Text", icon: Icons.WavesIcon, color: "from-blue-400 via-cyan-400 to-teal-400" },
  { id: "bounce-text", name: "Bounce Text", icon: Icons.TypeIcon, color: "from-green-400 via-emerald-400 to-teal-400" },
  { id: "fade-text", name: "Fade Text", icon: Icons.TypeIcon, color: "from-gray-400 via-slate-400 to-zinc-400" },
  { id: "rotate-text", name: "Rotate Text", icon: Icons.LoaderIcon, color: "from-purple-400 via-violet-400 to-indigo-400" },
  { id: "scale-text", name: "Scale Text", icon: Icons.TypeIcon, color: "from-orange-400 via-red-400 to-pink-400" },
  { id: "blur-text", name: "Blur Text", icon: Icons.TypeIcon, color: "from-indigo-400 via-purple-400 to-pink-400" },
  { id: "shadow-text", name: "Shadow Text", icon: Icons.TypeIcon, color: "from-yellow-400 via-orange-400 to-red-400" },
  { id: "outline-text", name: "Outline Text", icon: Icons.TypeIcon, color: "from-teal-400 via-cyan-400 to-blue-400" },
  { id: "stroke-text", name: "Stroke Text", icon: Icons.TypeIcon, color: "from-pink-400 via-rose-400 to-red-400" },
  { id: "mirror-text", name: "Mirror Text", icon: Icons.TypeIcon, color: "from-violet-400 via-purple-400 to-indigo-400" },
  { id: "split-text", name: "Split Text", icon: Icons.TypeIcon, color: "from-emerald-400 via-teal-400 to-cyan-400" },
  { id: "morph-text", name: "Morph Text", icon: Icons.TypeIcon, color: "from-amber-400 via-yellow-400 to-orange-400" },
  { id: "liquid-text", name: "Liquid Text", icon: Icons.WavesIcon, color: "from-blue-300 via-cyan-300 to-teal-300" },
  
  // Animated Badges & Icons (20)
  { id: "neon-badge", name: "Neon Badge", icon: Icons.ZapIcon, color: "from-pink-500 via-purple-500 to-blue-500" },
  { id: "pulse-badge", name: "Pulse Badge", icon: Icons.CircleIcon, color: "from-red-500 via-pink-500 to-purple-500" },
  { id: "rotate-icon", name: "Rotate Icon", icon: Icons.LoaderIcon, color: "from-indigo-500 via-purple-500 to-pink-500" },
  { id: "glow-badge", name: "Glow Badge", icon: Icons.SparklesIcon, color: "from-yellow-300 via-orange-300 to-red-300" },
  { id: "shimmer-badge", name: "Shimmer Badge", icon: Icons.SparklesIcon, color: "from-blue-300 via-indigo-300 to-purple-300" },
  { id: "bounce-icon", name: "Bounce Icon", icon: Icons.MousePointerIcon, color: "from-green-300 via-emerald-300 to-teal-300" },
  { id: "scale-icon", name: "Scale Icon", icon: Icons.MousePointerIcon, color: "from-orange-300 via-red-300 to-pink-300" },
  { id: "flip-icon", name: "Flip Icon", icon: Icons.LoaderIcon, color: "from-purple-300 via-violet-300 to-indigo-300" },
  { id: "slide-icon", name: "Slide Icon", icon: Icons.MoveIcon, color: "from-cyan-300 via-blue-300 to-indigo-300" },
  { id: "fade-icon", name: "Fade Icon", icon: Icons.CircleIcon, color: "from-gray-300 via-slate-300 to-zinc-300" },
  { id: "wave-icon", name: "Wave Icon", icon: Icons.WavesIcon, color: "from-teal-300 via-cyan-300 to-blue-300" },
  { id: "pulse-icon", name: "Pulse Icon", icon: Icons.CircleIcon, color: "from-red-300 via-pink-300 to-purple-300" },
  { id: "glow-icon", name: "Glow Icon", icon: Icons.SparklesIcon, color: "from-yellow-200 via-orange-200 to-red-200" },
  { id: "neon-icon", name: "Neon Icon", icon: Icons.ZapIcon, color: "from-pink-200 via-purple-200 to-indigo-200" },
  { id: "hologram-icon", name: "Hologram Icon", icon: Icons.SparklesIcon, color: "from-cyan-200 via-blue-200 to-purple-200" },
  { id: "crystal-icon", name: "Crystal Icon", icon: Icons.SparklesIcon, color: "from-green-200 via-teal-200 to-cyan-200" },
  { id: "plasma-icon", name: "Plasma Icon", icon: Icons.ZapIcon, color: "from-orange-200 via-red-200 to-pink-200" },
  { id: "aurora-icon", name: "Aurora Icon", icon: Icons.SparklesIcon, color: "from-purple-200 via-violet-200 to-indigo-200" },
  { id: "meteor-icon", name: "Meteor Icon", icon: Icons.StarIcon, color: "from-yellow-200 via-amber-200 to-orange-200" },
  { id: "quantum-icon", name: "Quantum Icon", icon: Icons.SparklesIcon, color: "from-violet-200 via-purple-200 to-pink-200" },
  
  // Interactive Elements (20)
  { id: "number-ticker", name: "Number Ticker", icon: Icons.ChartIcon, color: "from-purple-500 via-violet-500 to-indigo-500" },
  { id: "progress-ring", name: "Progress Ring", icon: Icons.LoaderIcon, color: "from-blue-400 via-cyan-400 to-teal-400" },
  { id: "loading-dots", name: "Loading Dots", icon: Icons.LoaderIcon, color: "from-green-400 via-emerald-400 to-teal-400" },
  { id: "spinner", name: "Spinner", icon: Icons.LoaderIcon, color: "from-orange-400 via-red-400 to-pink-400" },
  { id: "skeleton", name: "Skeleton", icon: Icons.SquareIcon, color: "from-gray-400 via-slate-400 to-zinc-400" },
  { id: "toast", name: "Toast", icon: Icons.BellIcon, color: "from-indigo-400 via-purple-400 to-pink-400" },
  { id: "modal", name: "Modal", icon: Icons.SquareIcon, color: "from-yellow-400 via-orange-400 to-red-400" },
  { id: "drawer", name: "Drawer", icon: Icons.SquareIcon, color: "from-teal-400 via-cyan-400 to-blue-400" },
  { id: "popover", name: "Popover", icon: Icons.SquareIcon, color: "from-pink-400 via-rose-400 to-red-400" },
  { id: "dropdown", name: "Dropdown", icon: Icons.ChevronDownIcon, color: "from-violet-400 via-purple-400 to-indigo-400" },
  { id: "accordion", name: "Accordion", icon: Icons.ChevronDownIcon, color: "from-emerald-400 via-teal-400 to-cyan-400" },
  { id: "carousel", name: "Carousel", icon: Icons.ChevronRightIcon, color: "from-amber-400 via-yellow-400 to-orange-400" },
  { id: "slider-range", name: "Range Slider", icon: Icons.SlidersIcon, color: "from-rose-400 via-pink-400 to-red-400" },
  { id: "switch", name: "Switch", icon: Icons.ToggleIcon, color: "from-lime-400 via-green-400 to-emerald-400" },
  { id: "rating", name: "Rating", icon: Icons.StarIcon, color: "from-yellow-300 via-amber-300 to-orange-300" },
  { id: "stepper", name: "Stepper", icon: Icons.ChevronRightIcon, color: "from-blue-300 via-indigo-300 to-purple-300" },
  { id: "timeline", name: "Timeline", icon: Icons.ChevronRightIcon, color: "from-green-300 via-teal-300 to-cyan-300" },
  { id: "calendar", name: "Calendar", icon: Icons.GridIcon, color: "from-orange-300 via-red-300 to-pink-300" },
  { id: "datepicker", name: "Date Picker", icon: Icons.ChevronDownIcon, color: "from-purple-300 via-violet-300 to-indigo-300" },
  { id: "colorpicker", name: "Color Picker", icon: Icons.PaletteIcon, color: "from-cyan-300 via-blue-300 to-indigo-300" }
]

const backgroundComponents = [
  // Geometric Patterns (20)
  { id: "bg-dots", name: "Dots", icon: Icons.GridIcon, color: "from-slate-500 to-slate-600" },
  { id: "bg-grid", name: "Grid", icon: Icons.GridIcon, color: "from-zinc-500 to-zinc-600" },
  { id: "bg-lines", name: "Lines", icon: Icons.MinusIcon, color: "from-green-500 to-emerald-500" },
  { id: "bg-circles", name: "Circles", icon: Icons.CircleIcon, color: "from-violet-500 to-purple-500" },
  { id: "bg-hexagon", name: "Hexagon", icon: Icons.SquareIcon, color: "from-yellow-500 to-orange-500" },
  { id: "bg-triangles", name: "Triangles", icon: Icons.SparklesIcon, color: "from-indigo-500 to-blue-500" },
  { id: "bg-squares", name: "Squares", icon: Icons.SquareIcon, color: "from-red-500 to-pink-500" },
  { id: "bg-diamonds", name: "Diamonds", icon: Icons.SparklesIcon, color: "from-cyan-500 to-teal-500" },
  { id: "bg-stripes", name: "Stripes", icon: Icons.MinusIcon, color: "from-orange-500 to-amber-500" },
  { id: "bg-chevron", name: "Chevron", icon: Icons.ChevronRightIcon, color: "from-purple-500 to-violet-500" },
  { id: "bg-zigzag", name: "Zigzag", icon: Icons.ZapIcon, color: "from-lime-500 to-green-500" },
  { id: "bg-cross", name: "Cross", icon: Icons.PlusIcon, color: "from-blue-500 to-indigo-500" },
  { id: "bg-plus", name: "Plus", icon: Icons.PlusIcon, color: "from-pink-500 to-rose-500" },
  { id: "bg-mesh", name: "Mesh", icon: Icons.GridIcon, color: "from-orange-500 to-red-500" },
  { id: "bg-weave", name: "Weave", icon: Icons.GridIcon, color: "from-teal-500 to-cyan-500" },
  { id: "bg-brick", name: "Brick", icon: Icons.SquareIcon, color: "from-amber-500 to-yellow-500" },
  { id: "bg-honeycomb", name: "Honeycomb", icon: Icons.SquareIcon, color: "from-violet-500 to-purple-500" },
  { id: "bg-scales", name: "Scales", icon: Icons.CircleIcon, color: "from-emerald-500 to-teal-500" },
  { id: "bg-waves-geo", name: "Wave Geo", icon: Icons.WavesIcon, color: "from-sky-500 to-blue-500" },
  { id: "bg-spiral-geo", name: "Spiral Geo", icon: Icons.LoaderIcon, color: "from-fuchsia-500 to-pink-500" },
  
  // Organic Patterns (20)
  { id: "bg-waves", name: "Waves", icon: Icons.WavesIcon, color: "from-teal-500 to-blue-500" },
  { id: "bg-ripple", name: "Ripple", icon: Icons.WavesIcon, color: "from-cyan-500 to-blue-500" },
  { id: "bg-cellular", name: "Cellular", icon: Icons.GridIcon, color: "from-teal-500 to-cyan-500" },
  { id: "bg-organic", name: "Organic", icon: Icons.SparklesIcon, color: "from-green-400 to-emerald-400" },
  { id: "bg-fluid", name: "Fluid", icon: Icons.WavesIcon, color: "from-blue-400 to-cyan-400" },
  { id: "bg-marble", name: "Marble", icon: Icons.SparklesIcon, color: "from-gray-400 to-slate-400" },
  { id: "bg-wood", name: "Wood", icon: Icons.MinusIcon, color: "from-amber-400 to-orange-400" },
  { id: "bg-stone", name: "Stone", icon: Icons.SquareIcon, color: "from-stone-400 to-gray-400" },
  { id: "bg-water", name: "Water", icon: Icons.WavesIcon, color: "from-blue-300 to-cyan-300" },
  { id: "bg-fire", name: "Fire", icon: Icons.ZapIcon, color: "from-red-400 to-orange-400" },
  { id: "bg-smoke", name: "Smoke", icon: Icons.SparklesIcon, color: "from-gray-300 to-slate-300" },
  { id: "bg-cloud", name: "Cloud", icon: Icons.SparklesIcon, color: "from-white to-gray-100" },
  { id: "bg-sand", name: "Sand", icon: Icons.SparklesIcon, color: "from-yellow-300 to-amber-300" },
  { id: "bg-grass", name: "Grass", icon: Icons.MinusIcon, color: "from-green-300 to-emerald-300" },
  { id: "bg-leaves", name: "Leaves", icon: Icons.SparklesIcon, color: "from-lime-300 to-green-300" },
  { id: "bg-flowers", name: "Flowers", icon: Icons.SparklesIcon, color: "from-pink-300 to-rose-300" },
  { id: "bg-coral", name: "Coral", icon: Icons.SparklesIcon, color: "from-coral-300 to-pink-300" },
  { id: "bg-crystal", name: "Crystal", icon: Icons.SparklesIcon, color: "from-cyan-200 to-blue-200" },
  { id: "bg-ice", name: "Ice", icon: Icons.SparklesIcon, color: "from-blue-100 to-cyan-100" },
  { id: "bg-lava", name: "Lava", icon: Icons.ZapIcon, color: "from-red-300 to-orange-300" },
  
  // Digital & Tech (20)
  { id: "bg-matrix", name: "Matrix", icon: Icons.GridIcon, color: "from-green-500 to-teal-500" },
  { id: "bg-circuit", name: "Circuit", icon: Icons.ZapIcon, color: "from-blue-400 to-indigo-400" },
  { id: "bg-binary", name: "Binary", icon: Icons.CodeIcon, color: "from-green-400 to-teal-400" },
  { id: "bg-code", name: "Code", icon: Icons.CodeIcon, color: "from-gray-400 to-slate-400" },
  { id: "bg-pixel", name: "Pixel", icon: Icons.SquareIcon, color: "from-purple-400 to-violet-400" },
  { id: "bg-glitch", name: "Glitch", icon: Icons.ZapIcon, color: "from-red-400 to-pink-400" },
  { id: "bg-scan", name: "Scan Lines", icon: Icons.MinusIcon, color: "from-cyan-400 to-blue-400" },
  { id: "bg-terminal", name: "Terminal", icon: Icons.CodeIcon, color: "from-green-300 to-emerald-300" },
  { id: "bg-data", name: "Data", icon: Icons.ChartIcon, color: "from-blue-300 to-indigo-300" },
  { id: "bg-network", name: "Network", icon: Icons.GridIcon, color: "from-purple-300 to-violet-300" },
  { id: "bg-cyber", name: "Cyber", icon: Icons.ZapIcon, color: "from-cyan-300 to-teal-300" },
  { id: "bg-neon", name: "Neon", icon: Icons.ZapIcon, color: "from-pink-300 to-purple-300" },
  { id: "bg-hologram", name: "Hologram", icon: Icons.SparklesIcon, color: "from-blue-200 to-cyan-200" },
  { id: "bg-digital", name: "Digital", icon: Icons.SquareIcon, color: "from-indigo-200 to-purple-200" },
  { id: "bg-tech", name: "Tech", icon: Icons.SettingsIcon, color: "from-gray-200 to-slate-200" },
  { id: "bg-futuristic", name: "Futuristic", icon: Icons.SparklesIcon, color: "from-violet-200 to-purple-200" },
  { id: "bg-ai", name: "AI", icon: Icons.SparklesIcon, color: "from-emerald-200 to-teal-200" },
  { id: "bg-quantum", name: "Quantum", icon: Icons.SparklesIcon, color: "from-purple-100 to-violet-100" },
  { id: "bg-space", name: "Space", icon: Icons.StarIcon, color: "from-indigo-100 to-purple-100" },
  { id: "bg-galaxy", name: "Galaxy", icon: Icons.SparklesIcon, color: "from-purple-50 to-pink-50" },
  
  // Animated Effects (20)
  { id: "bg-particles", name: "Particles", icon: Icons.SparklesIcon, color: "from-blue-500 to-cyan-500" },
  { id: "bg-aurora", name: "Aurora", icon: Icons.SparklesIcon, color: "from-purple-500 via-pink-500 to-blue-500" },
  { id: "bg-plasma", name: "Plasma", icon: Icons.SparklesIcon, color: "from-pink-500 to-red-500" },
  { id: "bg-lightning", name: "Lightning", icon: Icons.ZapIcon, color: "from-yellow-500 to-purple-500" },
  { id: "bg-spiral", name: "Spiral", icon: Icons.LoaderIcon, color: "from-violet-500 to-indigo-500" },
  { id: "bg-fractal", name: "Fractal", icon: Icons.SparklesIcon, color: "from-orange-500 to-yellow-500" },
  { id: "bg-noise", name: "Noise", icon: Icons.SparklesIcon, color: "from-gray-500 to-slate-500" },
  { id: "bg-static", name: "Static", icon: Icons.SparklesIcon, color: "from-gray-400 to-zinc-400" },
  { id: "bg-pulse", name: "Pulse", icon: Icons.CircleIcon, color: "from-red-400 to-pink-400" },
  { id: "bg-breathe", name: "Breathe", icon: Icons.CircleIcon, color: "from-blue-400 to-cyan-400" },
  { id: "bg-flow", name: "Flow", icon: Icons.WavesIcon, color: "from-teal-400 to-green-400" },
  { id: "bg-drift", name: "Drift", icon: Icons.MoveIcon, color: "from-purple-400 to-pink-400" },
  { id: "bg-float", name: "Float", icon: Icons.SparklesIcon, color: "from-cyan-400 to-blue-400" },
  { id: "bg-shimmer", name: "Shimmer", icon: Icons.SparklesIcon, color: "from-yellow-400 to-amber-400" },
  { id: "bg-glow", name: "Glow", icon: Icons.SparklesIcon, color: "from-orange-400 to-red-400" },
  { id: "bg-flicker", name: "Flicker", icon: Icons.ZapIcon, color: "from-yellow-300 to-orange-300" },
  { id: "bg-twinkle", name: "Twinkle", icon: Icons.StarIcon, color: "from-blue-300 to-indigo-300" },
  { id: "bg-sparkle", name: "Sparkle", icon: Icons.SparklesIcon, color: "from-pink-300 to-purple-300" },
  { id: "bg-dance", name: "Dance", icon: Icons.SparklesIcon, color: "from-violet-300 to-indigo-300" },
  { id: "bg-morph", name: "Morph", icon: Icons.SparklesIcon, color: "from-emerald-300 to-teal-300" },
  
  // Artistic & Abstract (20)
  { id: "bg-gradient", name: "Gradient", icon: Icons.PaletteIcon, color: "from-pink-500 to-purple-500" },
  { id: "bg-abstract", name: "Abstract", icon: Icons.SparklesIcon, color: "from-indigo-400 to-purple-400" },
  { id: "bg-artistic", name: "Artistic", icon: Icons.PaletteIcon, color: "from-pink-400 to-rose-400" },
  { id: "bg-paint", name: "Paint", icon: Icons.PaletteIcon, color: "from-blue-400 to-cyan-400" },
  { id: "bg-brush", name: "Brush", icon: Icons.PaletteIcon, color: "from-green-400 to-emerald-400" },
  { id: "bg-splash", name: "Splash", icon: Icons.SparklesIcon, color: "from-orange-400 to-red-400" },
  { id: "bg-ink", name: "Ink", icon: Icons.SparklesIcon, color: "from-gray-400 to-slate-400" },
  { id: "bg-watercolor", name: "Watercolor", icon: Icons.PaletteIcon, color: "from-purple-300 to-pink-300" },
  { id: "bg-oil", name: "Oil Paint", icon: Icons.PaletteIcon, color: "from-amber-300 to-orange-300" },
  { id: "bg-pastel", name: "Pastel", icon: Icons.PaletteIcon, color: "from-pink-200 to-purple-200" },
  { id: "bg-sketch", name: "Sketch", icon: Icons.PencilIcon, color: "from-gray-300 to-slate-300" },
  { id: "bg-charcoal", name: "Charcoal", icon: Icons.PencilIcon, color: "from-zinc-300 to-gray-300" },
  { id: "bg-vintage", name: "Vintage", icon: Icons.ImageIcon, color: "from-sepia-300 to-amber-300" },
  { id: "bg-retro", name: "Retro", icon: Icons.SparklesIcon, color: "from-orange-300 to-pink-300" },
  { id: "bg-pop", name: "Pop Art", icon: Icons.SparklesIcon, color: "from-red-300 to-yellow-300" },
  { id: "bg-minimal", name: "Minimal", icon: Icons.CircleIcon, color: "from-gray-200 to-slate-200" },
  { id: "bg-modern", name: "Modern", icon: Icons.SquareIcon, color: "from-blue-200 to-indigo-200" },
  { id: "bg-classic", name: "Classic", icon: Icons.SquareIcon, color: "from-brown-200 to-amber-200" },
  { id: "bg-elegant", name: "Elegant", icon: Icons.SparklesIcon, color: "from-purple-100 to-pink-100" },
  { id: "bg-luxury", name: "Luxury", icon: Icons.SparklesIcon, color: "from-gold-100 to-amber-100" }
]

const templateComponents = [
  // Authentication & Forms (20)
  { id: "login-form", name: "Login", icon: Icons.UserIcon, color: "from-blue-600 to-purple-600" },
  { id: "signup-form", name: "Signup", icon: Icons.UserIcon, color: "from-purple-600 to-pink-600" },
  { id: "contact-form", name: "Contacto", icon: Icons.MailIcon, color: "from-teal-600 to-cyan-600" },
  { id: "newsletter", name: "Newsletter", icon: Icons.MailIcon, color: "from-pink-600 to-rose-600" },
  { id: "forgot-password", name: "Recuperar", icon: Icons.LockIcon, color: "from-orange-600 to-red-600" },
  { id: "reset-password", name: "Reset Pass", icon: Icons.LockIcon, color: "from-red-600 to-pink-600" },
  { id: "two-factor", name: "2FA", icon: Icons.LockIcon, color: "from-indigo-600 to-purple-600" },
  { id: "verification", name: "Verificación", icon: Icons.CheckIcon, color: "from-green-600 to-emerald-600" },
  { id: "profile-form", name: "Perfil Form", icon: Icons.UserIcon, color: "from-blue-500 to-indigo-500" },
  { id: "settings-form", name: "Configuración", icon: Icons.SettingsIcon, color: "from-gray-500 to-slate-500" },
  { id: "feedback-form", name: "Feedback", icon: Icons.StarIcon, color: "from-yellow-500 to-orange-500" },
  { id: "survey-form", name: "Encuesta", icon: Icons.FileTextIcon, color: "from-purple-500 to-violet-500" },
  { id: "booking-form", name: "Reserva", icon: Icons.ChevronRightIcon, color: "from-teal-500 to-cyan-500" },
  { id: "application-form", name: "Aplicación", icon: Icons.FileTextIcon, color: "from-emerald-500 to-green-500" },
  { id: "subscription-form", name: "Suscripción", icon: Icons.CreditCardIcon, color: "from-pink-500 to-rose-500" },
  { id: "quote-form", name: "Cotización", icon: Icons.FileTextIcon, color: "from-amber-500 to-yellow-500" },
  { id: "support-form", name: "Soporte", icon: Icons.InfoIcon, color: "from-cyan-500 to-blue-500" },
  { id: "report-form", name: "Reporte", icon: Icons.FileTextIcon, color: "from-red-500 to-pink-500" },
  { id: "upload-form", name: "Subir Archivo", icon: Icons.FolderIcon, color: "from-violet-500 to-purple-500" },
  { id: "multi-step-form", name: "Multi-Step", icon: Icons.ChevronRightIcon, color: "from-indigo-500 to-blue-500" },
  
  // E-commerce & Business (20)
  { id: "pricing-card", name: "Pricing", icon: Icons.CreditCardIcon, color: "from-green-600 to-teal-600" },
  { id: "product-card", name: "Product", icon: Icons.SquareIcon, color: "from-blue-600 to-indigo-600" },
  { id: "cart-item", name: "Cart Item", icon: Icons.SquareIcon, color: "from-orange-500 to-red-500" },
  { id: "checkout-form", name: "Checkout", icon: Icons.CreditCardIcon, color: "from-green-500 to-emerald-500" },
  { id: "invoice", name: "Factura", icon: Icons.FileTextIcon, color: "from-blue-500 to-cyan-500" },
  { id: "receipt", name: "Recibo", icon: Icons.FileTextIcon, color: "from-purple-500 to-pink-500" },
  { id: "order-summary", name: "Resumen Orden", icon: Icons.FileTextIcon, color: "from-teal-500 to-cyan-500" },
  { id: "payment-method", name: "Método Pago", icon: Icons.CreditCardIcon, color: "from-indigo-500 to-purple-500" },
  { id: "shipping-info", name: "Envío", icon: Icons.MoveIcon, color: "from-amber-500 to-orange-500" },
  { id: "product-grid", name: "Grid Productos", icon: Icons.GridIcon, color: "from-emerald-500 to-teal-500" },
  { id: "product-list", name: "Lista Productos", icon: Icons.LayersIcon, color: "from-pink-500 to-rose-500" },
  { id: "wishlist-item", name: "Lista Deseos", icon: Icons.StarIcon, color: "from-red-500 to-pink-500" },
  { id: "comparison-table", name: "Comparación", icon: Icons.GridIcon, color: "from-violet-500 to-purple-500" },
  { id: "review-card", name: "Reseña", icon: Icons.StarIcon, color: "from-yellow-400 to-amber-400" },
  { id: "coupon-card", name: "Cupón", icon: Icons.BadgeIcon, color: "from-green-400 to-emerald-400" },
  { id: "deal-card", name: "Oferta", icon: Icons.ZapIcon, color: "from-red-400 to-orange-400" },
  { id: "category-card", name: "Categoría", icon: Icons.FolderIcon, color: "from-blue-400 to-indigo-400" },
  { id: "brand-card", name: "Marca", icon: Icons.SquareIcon, color: "from-purple-400 to-violet-400" },
  { id: "seller-card", name: "Vendedor", icon: Icons.UserIcon, color: "from-teal-400 to-cyan-400" },
  { id: "affiliate-card", name: "Afiliado", icon: Icons.ChevronRightIcon, color: "from-pink-400 to-rose-400" },
  
  // Content & Media (20)
  { id: "blog-card", name: "Blog", icon: Icons.FileTextIcon, color: "from-slate-600 to-gray-600" },
  { id: "article-card", name: "Artículo", icon: Icons.FileTextIcon, color: "from-indigo-400 to-blue-400" },
  { id: "news-card", name: "Noticia", icon: Icons.FileTextIcon, color: "from-red-400 to-pink-400" },
  { id: "gallery-card", name: "Gallery", icon: Icons.ImageIcon, color: "from-purple-600 to-violet-600" },
  { id: "video-card", name: "Video", icon: Icons.PlayIcon, color: "from-blue-400 to-cyan-400" },
  { id: "audio-card", name: "Audio", icon: Icons.WavesIcon, color: "from-green-400 to-emerald-400" },
  { id: "podcast-card", name: "Podcast", icon: Icons.WavesIcon, color: "from-purple-400 to-pink-400" },
  { id: "portfolio-item", name: "Portfolio", icon: Icons.ImageIcon, color: "from-orange-400 to-red-400" },
  { id: "case-study", name: "Caso Estudio", icon: Icons.FileTextIcon, color: "from-teal-400 to-cyan-400" },
  { id: "testimonial", name: "Testimonial", icon: Icons.StarIcon, color: "from-yellow-600 to-orange-600" },
  { id: "quote-card", name: "Cita", icon: Icons.FileTextIcon, color: "from-gray-400 to-slate-400" },
  { id: "author-bio", name: "Bio Autor", icon: Icons.UserIcon, color: "from-emerald-400 to-green-400" },
  { id: "social-post", name: "Post Social", icon: Icons.SquareIcon, color: "from-pink-300 to-purple-300" },
  { id: "comment-card", name: "Comentario", icon: Icons.FileTextIcon, color: "from-blue-300 to-indigo-300" },
  { id: "media-player", name: "Reproductor", icon: Icons.PlayIcon, color: "from-red-300 to-pink-300" },
  { id: "playlist-item", name: "Playlist", icon: Icons.LayersIcon, color: "from-purple-300 to-violet-300" },
  { id: "album-cover", name: "Portada Album", icon: Icons.ImageIcon, color: "from-cyan-300 to-teal-300" },
  { id: "book-card", name: "Libro", icon: Icons.FileTextIcon, color: "from-amber-300 to-yellow-300" },
  { id: "magazine-cover", name: "Revista", icon: Icons.ImageIcon, color: "from-rose-300 to-pink-300" },
  { id: "document-preview", name: "Vista Previa", icon: Icons.FileTextIcon, color: "from-slate-300 to-gray-300" },
  
  // Navigation & Layout (20)
  { id: "navigation", name: "Navigation", icon: Icons.LayersIcon, color: "from-indigo-600 to-blue-600" },
  { id: "header", name: "Header", icon: Icons.MinusIcon, color: "from-blue-300 to-indigo-300" },
  { id: "footer", name: "Footer", icon: Icons.MinusIcon, color: "from-zinc-600 to-gray-600" },
  { id: "sidebar", name: "Sidebar", icon: Icons.SquareIcon, color: "from-purple-300 to-violet-300" },
  { id: "breadcrumb", name: "Breadcrumb", icon: Icons.ChevronRightIcon, color: "from-gray-300 to-slate-300" },
  { id: "menu-dropdown", name: "Menú", icon: Icons.ChevronDownIcon, color: "from-green-300 to-emerald-300" },
  { id: "mega-menu", name: "Mega Menú", icon: Icons.GridIcon, color: "from-orange-300 to-red-300" },
  { id: "tab-navigation", name: "Tabs Nav", icon: Icons.LayersIcon, color: "from-teal-300 to-cyan-300" },
  { id: "pagination", name: "Paginación", icon: Icons.ChevronRightIcon, color: "from-indigo-300 to-purple-300" },
  { id: "search-bar", name: "Search", icon: Icons.SearchIcon, color: "from-gray-600 to-slate-600" },
  { id: "filter-bar", name: "Filtros", icon: Icons.SlidersIcon, color: "from-pink-300 to-rose-300" },
  { id: "sort-dropdown", name: "Ordenar", icon: Icons.ChevronDownIcon, color: "from-violet-300 to-purple-300" },
  { id: "mobile-menu", name: "Menú Móvil", icon: Icons.LayersIcon, color: "from-emerald-300 to-teal-300" },
  { id: "drawer-menu", name: "Drawer", icon: Icons.SquareIcon, color: "from-amber-300 to-yellow-300" },
  { id: "sticky-nav", name: "Nav Fijo", icon: Icons.MinusIcon, color: "from-rose-300 to-red-300" },
  { id: "floating-nav", name: "Nav Flotante", icon: Icons.CircleIcon, color: "from-lime-300 to-green-300" },
  { id: "progress-nav", name: "Nav Progreso", icon: Icons.LoaderIcon, color: "from-sky-300 to-blue-300" },
  { id: "step-indicator", name: "Indicador Pasos", icon: Icons.ChevronRightIcon, color: "from-fuchsia-300 to-pink-300" },
  { id: "back-to-top", name: "Volver Arriba", icon: Icons.ArrowUpIcon, color: "from-indigo-200 to-purple-200" },
  { id: "scroll-indicator", name: "Indicador Scroll", icon: Icons.LoaderIcon, color: "from-green-200 to-emerald-200" },
  
  // Dashboard & Analytics (20)
  { id: "stats-card", name: "Estadísticas", icon: Icons.ChartIcon, color: "from-blue-600 to-cyan-600" },
  { id: "kpi-card", name: "KPI", icon: Icons.ChartIcon, color: "from-green-200 to-emerald-200" },
  { id: "metric-card", name: "Métrica", icon: Icons.ChartIcon, color: "from-orange-200 to-red-200" },
  { id: "chart-widget", name: "Gráfico", icon: Icons.ChartIcon, color: "from-purple-200 to-violet-200" },
  { id: "progress-card", name: "Progreso", icon: Icons.LoaderIcon, color: "from-teal-200 to-cyan-200" },
  { id: "activity-feed", name: "Feed Actividad", icon: Icons.BellIcon, color: "from-pink-200 to-rose-200" },
  { id: "notification", name: "Notificación", icon: Icons.BellIcon, color: "from-orange-600 to-red-600" },
  { id: "alert-banner", name: "Banner Alerta", icon: Icons.InfoIcon, color: "from-yellow-200 to-amber-200" },
  { id: "status-indicator", name: "Estado", icon: Icons.CircleIcon, color: "from-lime-200 to-green-200" },
  { id: "health-check", name: "Salud Sistema", icon: Icons.CheckIcon, color: "from-sky-200 to-blue-200" },
  { id: "uptime-widget", name: "Tiempo Activo", icon: Icons.LoaderIcon, color: "from-fuchsia-200 to-pink-200" },
  { id: "performance-card", name: "Rendimiento", icon: Icons.ZapIcon, color: "from-indigo-100 to-purple-100" },
  { id: "usage-chart", name: "Uso", icon: Icons.ChartIcon, color: "from-green-100 to-emerald-100" },
  { id: "revenue-card", name: "Ingresos", icon: Icons.CreditCardIcon, color: "from-orange-100 to-red-100" },
  { id: "user-analytics", name: "Analítica Usuario", icon: Icons.UserIcon, color: "from-purple-100 to-violet-100" },
  { id: "conversion-funnel", name: "Embudo", icon: Icons.ChartIcon, color: "from-teal-100 to-cyan-100" },
  { id: "heatmap-widget", name: "Mapa Calor", icon: Icons.GridIcon, color: "from-pink-100 to-rose-100" },
  { id: "timeline-card", name: "Timeline", icon: Icons.ChevronRightIcon, color: "from-orange-600 to-amber-600" },
  { id: "calendar-widget", name: "Calendario", icon: Icons.GridIcon, color: "from-violet-100 to-purple-100" },
  { id: "task-card", name: "Tarea", icon: Icons.CheckIcon, color: "from-emerald-100 to-teal-100" }
]

const effectsComponents = [
  // Visual Effects (20)
  { id: "effect-glow", name: "Glow", icon: Icons.SparklesIcon, color: "from-yellow-400 to-orange-400" },
  { id: "effect-shimmer", name: "Shimmer", icon: Icons.ZapIcon, color: "from-blue-400 to-cyan-400" },
  { id: "effect-gradient", name: "Gradiente", icon: Icons.PaletteIcon, color: "from-pink-400 to-purple-400" },
  { id: "effect-shadow", name: "Shadow", icon: Icons.SquareIcon, color: "from-gray-400 to-slate-400" },
  { id: "effect-blur", name: "Blur", icon: Icons.CircleIcon, color: "from-cyan-400 to-blue-400" },
  { id: "effect-glass", name: "Glass", icon: Icons.SquareIcon, color: "from-teal-400 to-cyan-400" },
  { id: "effect-neon", name: "Neon", icon: Icons.ZapIcon, color: "from-pink-400 to-purple-400" },
  { id: "effect-hologram", name: "Hologram", icon: Icons.SparklesIcon, color: "from-blue-400 to-cyan-400" },
  { id: "effect-chrome", name: "Chrome", icon: Icons.SparklesIcon, color: "from-gray-300 to-slate-300" },
  { id: "effect-metallic", name: "Metálico", icon: Icons.SparklesIcon, color: "from-zinc-300 to-gray-300" },
  { id: "effect-crystal", name: "Cristal", icon: Icons.SparklesIcon, color: "from-cyan-300 to-blue-300" },
  { id: "effect-plasma", name: "Plasma", icon: Icons.ZapIcon, color: "from-pink-300 to-purple-300" },
  { id: "effect-aurora", name: "Aurora", icon: Icons.SparklesIcon, color: "from-green-300 to-teal-300" },
  { id: "effect-prism", name: "Prisma", icon: Icons.SparklesIcon, color: "from-rainbow-300 to-rainbow-400" },
  { id: "effect-mirror", name: "Espejo", icon: Icons.SquareIcon, color: "from-silver-300 to-gray-300" },
  { id: "effect-frost", name: "Escarcha", icon: Icons.SparklesIcon, color: "from-blue-200 to-cyan-200" },
  { id: "effect-fire", name: "Fuego", icon: Icons.ZapIcon, color: "from-red-300 to-orange-300" },
  { id: "effect-water", name: "Agua", icon: Icons.WavesIcon, color: "from-blue-300 to-cyan-300" },
  { id: "effect-smoke", name: "Humo", icon: Icons.SparklesIcon, color: "from-gray-200 to-slate-200" },
  { id: "effect-electric", name: "Eléctrico", icon: Icons.ZapIcon, color: "from-yellow-300 to-blue-300" },
  
  // Motion Effects (20)
  { id: "effect-ripple", name: "Ripple", icon: Icons.WavesIcon, color: "from-blue-400 to-indigo-400" },
  { id: "effect-pulse", name: "Pulse", icon: Icons.CircleIcon, color: "from-red-400 to-pink-400" },
  { id: "effect-bounce", name: "Bounce", icon: Icons.MousePointerIcon, color: "from-green-400 to-emerald-400" },
  { id: "effect-rotate", name: "Rotate", icon: Icons.LoaderIcon, color: "from-purple-400 to-violet-400" },
  { id: "effect-scale", name: "Scale", icon: Icons.MousePointerIcon, color: "from-orange-400 to-red-400" },
  { id: "effect-slide", name: "Slide", icon: Icons.MoveIcon, color: "from-indigo-400 to-blue-400" },
  { id: "effect-fade", name: "Fade", icon: Icons.CircleIcon, color: "from-gray-400 to-zinc-400" },
  { id: "effect-flip", name: "Flip", icon: Icons.SquareIcon, color: "from-violet-400 to-purple-400" },
  { id: "effect-swing", name: "Swing", icon: Icons.MoveIcon, color: "from-green-300 to-emerald-300" },
  { id: "effect-shake", name: "Shake", icon: Icons.ZapIcon, color: "from-red-300 to-pink-300" },
  { id: "effect-wobble", name: "Wobble", icon: Icons.WavesIcon, color: "from-blue-300 to-cyan-300" },
  { id: "effect-jello", name: "Jello", icon: Icons.WavesIcon, color: "from-purple-300 to-violet-300" },
  { id: "effect-rubber", name: "Rubber", icon: Icons.MousePointerIcon, color: "from-orange-300 to-red-300" },
  { id: "effect-elastic", name: "Elástico", icon: Icons.MoveIcon, color: "from-teal-300 to-cyan-300" },
  { id: "effect-spring", name: "Resorte", icon: Icons.MousePointerIcon, color: "from-lime-300 to-green-300" },
  { id: "effect-pendulum", name: "Péndulo", icon: Icons.LoaderIcon, color: "from-indigo-300 to-purple-300" },
  { id: "effect-orbit", name: "Órbita", icon: Icons.LoaderIcon, color: "from-pink-300 to-rose-300" },
  { id: "effect-spiral", name: "Espiral", icon: Icons.LoaderIcon, color: "from-violet-300 to-purple-300" },
  { id: "effect-float", name: "Flotante", icon: Icons.SparklesIcon, color: "from-cyan-200 to-blue-200" },
  { id: "effect-drift", name: "Deriva", icon: Icons.MoveIcon, color: "from-emerald-200 to-teal-200" },
  
  // Transform Effects (20)
  { id: "effect-morph", name: "Morph", icon: Icons.SparklesIcon, color: "from-teal-400 to-green-400" },
  { id: "effect-stretch", name: "Estirar", icon: Icons.MoveIcon, color: "from-orange-200 to-red-200" },
  { id: "effect-squeeze", name: "Comprimir", icon: Icons.MousePointerIcon, color: "from-purple-200 to-violet-200" },
  { id: "effect-skew", name: "Sesgar", icon: Icons.MoveIcon, color: "from-indigo-200 to-blue-200" },
  { id: "effect-perspective", name: "Perspectiva", icon: Icons.SquareIcon, color: "from-teal-200 to-cyan-200" },
  { id: "effect-3d-rotate", name: "3D Rotate", icon: Icons.LoaderIcon, color: "from-pink-200 to-rose-200" },
  { id: "effect-3d-flip", name: "3D Flip", icon: Icons.SquareIcon, color: "from-violet-200 to-purple-200" },
  { id: "effect-cube", name: "Cubo", icon: Icons.SquareIcon, color: "from-emerald-200 to-green-200" },
  { id: "effect-cylinder", name: "Cilindro", icon: Icons.CircleIcon, color: "from-amber-200 to-yellow-200" },
  { id: "effect-sphere", name: "Esfera", icon: Icons.CircleIcon, color: "from-rose-200 to-pink-200" },
  { id: "effect-pyramid", name: "Pirámide", icon: Icons.SparklesIcon, color: "from-lime-200 to-green-200" },
  { id: "effect-prism-3d", name: "Prisma 3D", icon: Icons.SparklesIcon, color: "from-sky-200 to-blue-200" },
  { id: "effect-fold", name: "Plegar", icon: Icons.SquareIcon, color: "from-fuchsia-200 to-pink-200" },
  { id: "effect-unfold", name: "Desplegar", icon: Icons.SquareIcon, color: "from-indigo-100 to-purple-100" },
  { id: "effect-origami", name: "Origami", icon: Icons.SparklesIcon, color: "from-green-100 to-emerald-100" },
  { id: "effect-paper", name: "Papel", icon: Icons.SquareIcon, color: "from-orange-100 to-red-100" },
  { id: "effect-card-flip", name: "Voltear Carta", icon: Icons.SquareIcon, color: "from-purple-100 to-violet-100" },
  { id: "effect-book-open", name: "Abrir Libro", icon: Icons.FileTextIcon, color: "from-teal-100 to-cyan-100" },
  { id: "effect-door-open", name: "Abrir Puerta", icon: Icons.SquareIcon, color: "from-pink-100 to-rose-100" },
  { id: "effect-curtain", name: "Cortina", icon: Icons.SquareIcon, color: "from-violet-100 to-purple-100" },
  
  // Particle Effects (20)
  { id: "effect-particle", name: "Particle", icon: Icons.SparklesIcon, color: "from-yellow-400 to-amber-400" },
  { id: "effect-confetti", name: "Confeti", icon: Icons.SparklesIcon, color: "from-rainbow-100 to-rainbow-200" },
  { id: "effect-sparkles", name: "Destellos", icon: Icons.SparklesIcon, color: "from-yellow-100 to-amber-100" },
  { id: "effect-stars", name: "Estrellas", icon: Icons.StarIcon, color: "from-blue-100 to-indigo-100" },
  { id: "effect-bubbles", name: "Burbujas", icon: Icons.CircleIcon, color: "from-cyan-100 to-blue-100" },
  { id: "effect-snow", name: "Nieve", icon: Icons.SparklesIcon, color: "from-white to-gray-50" },
  { id: "effect-rain", name: "Lluvia", icon: Icons.MinusIcon, color: "from-blue-50 to-cyan-50" },
  { id: "effect-leaves", name: "Hojas", icon: Icons.SparklesIcon, color: "from-green-50 to-emerald-50" },
  { id: "effect-petals", name: "Pétalos", icon: Icons.SparklesIcon, color: "from-pink-50 to-rose-50" },
  { id: "effect-dust", name: "Polvo", icon: Icons.SparklesIcon, color: "from-amber-50 to-yellow-50" },
  { id: "effect-glitter", name: "Purpurina", icon: Icons.SparklesIcon, color: "from-purple-50 to-violet-50" },
  { id: "effect-fireflies", name: "Luciérnagas", icon: Icons.SparklesIcon, color: "from-lime-50 to-green-50" },
  { id: "effect-embers", name: "Brasas", icon: Icons.ZapIcon, color: "from-red-50 to-orange-50" },
  { id: "effect-sparks", name: "Chispas", icon: Icons.ZapIcon, color: "from-yellow-50 to-amber-50" },
  { id: "effect-magic", name: "Magia", icon: Icons.SparklesIcon, color: "from-violet-50 to-purple-50" },
  { id: "effect-cosmic", name: "Cósmico", icon: Icons.StarIcon, color: "from-indigo-50 to-blue-50" },
  { id: "effect-nebula", name: "Nebulosa", icon: Icons.SparklesIcon, color: "from-purple-25 to-pink-25" },
  { id: "effect-stardust", name: "Polvo Estelar", icon: Icons.SparklesIcon, color: "from-blue-25 to-cyan-25" },
  { id: "effect-meteor", name: "Meteoro", icon: Icons.StarIcon, color: "from-orange-25 to-red-25" },
  { id: "effect-comet", name: "Cometa", icon: Icons.StarIcon, color: "from-cyan-25 to-blue-25" },
  
  // Advanced Effects (20)
  { id: "effect-wave", name: "Wave", icon: Icons.WavesIcon, color: "from-cyan-400 to-teal-400" },
  { id: "effect-lightning", name: "Lightning", icon: Icons.ZapIcon, color: "from-yellow-400 to-purple-400" },
  { id: "effect-distortion", name: "Distorsión", icon: Icons.WavesIcon, color: "from-purple-25 to-violet-25" },
  { id: "effect-glitch", name: "Glitch", icon: Icons.ZapIcon, color: "from-red-25 to-pink-25" },
  { id: "effect-noise", name: "Ruido", icon: Icons.SparklesIcon, color: "from-gray-25 to-slate-25" },
  { id: "effect-static", name: "Estática", icon: Icons.SparklesIcon, color: "from-zinc-25 to-gray-25" },
  { id: "effect-interference", name: "Interferencia", icon: Icons.WavesIcon, color: "from-blue-10 to-cyan-10" },
  { id: "effect-chromatic", name: "Cromático", icon: Icons.PaletteIcon, color: "from-rainbow-10 to-rainbow-25" },
  { id: "effect-aberration", name: "Aberración", icon: Icons.SparklesIcon, color: "from-red-10 to-blue-10" },
  { id: "effect-vignette", name: "Viñeta", icon: Icons.CircleIcon, color: "from-black to-gray-900" },
  { id: "effect-bloom", name: "Bloom", icon: Icons.SparklesIcon, color: "from-white to-yellow-50" },
  { id: "effect-lens-flare", name: "Destello", icon: Icons.SparklesIcon, color: "from-yellow-10 to-orange-10" },
  { id: "effect-god-rays", name: "Rayos Divinos", icon: Icons.ZapIcon, color: "from-yellow-5 to-amber-5" },
  { id: "effect-volumetric", name: "Volumétrico", icon: Icons.SparklesIcon, color: "from-blue-5 to-cyan-5" },
  { id: "effect-subsurface", name: "Subsuperficie", icon: Icons.SparklesIcon, color: "from-red-5 to-orange-5" },
  { id: "effect-caustics", name: "Cáusticas", icon: Icons.WavesIcon, color: "from-cyan-5 to-blue-5" },
  { id: "effect-refraction", name: "Refracción", icon: Icons.SparklesIcon, color: "from-clear to-white" },
  { id: "effect-reflection", name: "Reflexión", icon: Icons.SquareIcon, color: "from-silver to-gray-100" },
  { id: "effect-iridescence", name: "Iridiscencia", icon: Icons.SparklesIcon, color: "from-rainbow-1 to-rainbow-5" },
,
  
  // New Effects - Particle & Advanced (20)
  { id: "effect-chispas", name: "Chispas", icon: Icons.ZapIcon, color: "from-orange-400 to-red-400" },
  { id: "effect-magia", name: "Magia", icon: Icons.SparklesIcon, color: "from-purple-400 to-indigo-400" },
  { id: "effect-cosmico", name: "Cósmico", icon: Icons.StarIcon, color: "from-indigo-400 to-purple-400" },
  { id: "effect-nebulosa", name: "Nebulosa", icon: Icons.SparklesIcon, color: "from-purple-300 to-pink-300" },
  { id: "effect-polvo-estelar", name: "Polvo Estelar", icon: Icons.SparklesIcon, color: "from-yellow-300 to-amber-300" },
  { id: "effect-meteoro", name: "Meteoro", icon: Icons.StarIcon, color: "from-orange-300 to-red-300" },
  { id: "effect-cometa", name: "Cometa", icon: Icons.StarIcon, color: "from-cyan-300 to-blue-300" },
  { id: "effect-distorsion", name: "Distorsión", icon: Icons.WavesIcon, color: "from-purple-300 to-pink-300" },
  { id: "effect-ruido", name: "Ruido", icon: Icons.SparklesIcon, color: "from-gray-300 to-slate-300" },
  { id: "effect-estatica", name: "Estática", icon: Icons.SparklesIcon, color: "from-gray-200 to-slate-200" },
  { id: "effect-interferencia", name: "Interferencia", icon: Icons.WavesIcon, color: "from-green-300 to-teal-300" },
  { id: "effect-cromatico", name: "Cromático", icon: Icons.PaletteIcon, color: "from-red-200 to-blue-200" },
  { id: "effect-aberracion", name: "Aberración", icon: Icons.SparklesIcon, color: "from-red-200 to-cyan-200" },
  { id: "effect-vineta", name: "Viñeta", icon: Icons.CircleIcon, color: "from-amber-200 to-orange-200" },
  { id: "effect-bloom", name: "Bloom", icon: Icons.SparklesIcon, color: "from-white to-yellow-100" },
  { id: "effect-destello", name: "Destello", icon: Icons.ZapIcon, color: "from-yellow-200 to-orange-200" },
  { id: "effect-rayos-divinos", name: "Rayos Divinos", icon: Icons.ZapIcon, color: "from-yellow-100 to-amber-100" },
  { id: "effect-volumetrico", name: "Volumétrico", icon: Icons.SparklesIcon, color: "from-blue-100 to-indigo-100" },
  { id: "effect-subsuperficie", name: "Subsuperficie", icon: Icons.SparklesIcon, color: "from-red-100 to-pink-100" },
  { id: "effect-causticas", name: "Cáusticas", icon: Icons.WavesIcon, color: "from-cyan-100 to-blue-100" },
  { id: "effect-refraccion", name: "Refracción", icon: Icons.SparklesIcon, color: "from-indigo-100 to-purple-100" },
  { id: "effect-reflexion", name: "Reflexión", icon: Icons.SquareIcon, color: "from-gray-100 to-slate-100" },
  { id: "effect-iridiscencia", name: "Iridiscencia", icon: Icons.SparklesIcon, color: "from-pink-100 to-purple-100" },
  { id: "effect-opalescencia", name: "Opalescencia", icon: Icons.SparklesIcon, color: "from-blue-50 to-purple-50" }
]

interface FolderItem {
  id: string
  name: string
  components: string[]
  isOpen: boolean
}

export function Sidebar({ onAddComponent }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [folders, setFolders] = useState<FolderItem[]>([{ id: "1", name: "Mi Proyecto", components: [], isOpen: true }])

  const toggleFolder = (folderId: string) => {
    setFolders((prev) => prev.map((f) => (f.id === folderId ? { ...f, isOpen: !f.isOpen } : f)))
  }

  const addFolder = () => {
    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name: `Carpeta ${folders.length + 1}`,
      components: [],
      isOpen: true,
    }
    setFolders([...folders, newFolder])
  }

  const deleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
  }

  const filterComponents = (components: any[]) => {
    return components.filter((comp) => comp.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const ComponentGrid = ({ components }: { components: any[] }) => (
    <div className="grid grid-cols-2 gap-1.5">
      {components.map((component) => (
        <div key={component.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className="p-1.5 cursor-pointer hover:bg-accent transition-colors group border-border/50"
                onClick={() => onAddComponent(component.id)}
              >
                <div
                  className={`w-6 h-6 rounded-md bg-gradient-to-br ${component.color} flex items-center justify-center mb-1 shadow-sm`}
                >
                  <component.icon className="w-3 h-3 text-white" />
                </div>
                <p className="text-[9px] font-medium text-foreground truncate leading-tight text-center">
                  {component.name}
                </p>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-xs">Click para agregar {component.name}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  )

  return (
    <TooltipProvider>
      <aside className="w-[240px] bg-background/95 backdrop-blur-sm border-r flex flex-col overflow-hidden">
        <div className="p-2 border-b">
          <h2 className="text-xs font-semibold text-foreground mb-2">Componentes</h2>

          <div className="relative">
            <Icons.SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>

        <Tabs defaultValue="basic" className="flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide px-2 pt-2">
            <TabsList className="inline-flex h-8 gap-1 w-max">
              <TabsTrigger value="basic" className="text-[10px] px-3">
                Básicos
              </TabsTrigger>
              <TabsTrigger value="magic" className="text-[10px] px-3">
                Magic UI
              </TabsTrigger>
              <TabsTrigger value="backgrounds" className="text-[10px] px-3">
                Fondos
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-[10px] px-3">
                Templates
              </TabsTrigger>
              <TabsTrigger value="effects" className="text-[10px] px-3">
                Efectos
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="basic" className="p-3 mt-0">
              <ComponentGrid components={filterComponents(basicComponents)} />
            </TabsContent>

            <TabsContent value="magic" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Componentes con animaciones premium estilo Magic UI
                </p>
              </div>
              <ComponentGrid components={filterComponents(magicUIComponents)} />
            </TabsContent>

            <TabsContent value="backgrounds" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Fondos animados y patrones decorativos
                </p>
              </div>
              <ComponentGrid components={filterComponents(backgroundComponents)} />
            </TabsContent>

            <TabsContent value="templates" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Componentes completos listos para usar
                </p>
              </div>
              <ComponentGrid components={filterComponents(templateComponents)} />
            </TabsContent>

            <TabsContent value="effects" className="p-3 mt-0">
              <div className="mb-3 p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Arrastra efectos sobre componentes para aplicarlos
                </p>
              </div>
              <ComponentGrid components={filterComponents(effectsComponents)} />
            </TabsContent>
          </div>
        </Tabs>

        <div className="border-t p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Carpetas</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={addFolder}>
              <Icons.PlusIcon className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto">
            {folders.map((folder) => (
              <div key={folder.id} className="flex items-center gap-1 group">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="flex-1 flex items-center gap-1.5 p-1.5 rounded hover:bg-accent transition-colors"
                >
                  {folder.isOpen ? (
                    <Icons.FolderOpenIcon className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <Icons.FolderIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <span className="text-[10px] text-foreground truncate">{folder.name}</span>
                  <span className="text-[9px] text-muted-foreground ml-auto">{folder.components.length}</span>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteFolder(folder.id)}
                >
                  <Icons.TrashIcon className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
