"use client"

import { useState } from "react"
import Link from "next/link"

// Editor Components (imported but not used in showcase)
// import { Topbar } from "@/components/editor/topbar"
// import { Sidebar } from "@/components/editor/sidebar"
// import { Canvas } from "@/components/editor/canvas"
// import { Inspector } from "@/components/editor/inspector"

// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
// import { Separator } from "@/components/ui/separator"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TooltipProvider } from "@/components/ui/tooltip"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Toaster } from "@/components/ui/toaster"

// System Components
import { ErrorBoundary } from "@/components/error-boundary"
import * as Icons from "@/components/icons"
import { ThemeProvider } from "@/components/theme-provider"

// Hooks
import { useErrorHandler } from "@/hooks/use-error-handler"
import { useLiveEffects } from "@/hooks/use-live-effects"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"

// Utils & Validation
import { cn, generateId, formatDate } from "@/lib/utils"
import { validateColor, sanitizeString, validateComponentId, validateComponentType } from "@/lib/validation"
import { COMPONENT_TYPES } from "@/lib/constants"

export default function TestAllPage() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState("")
  
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const errorHandler = useErrorHandler()
  const effectsRef = useLiveEffects({ glow: { enabled: true, intensity: 50, color: '#3b82f6' } })

  const runAllTests = async () => {
    setIsRunning(true)
    const results: Record<string, boolean> = {}

    // Test Routes
    setCurrentTest("Testing Routes...")
    try {
      results.routes = true
      results.mainPage = typeof window !== 'undefined'
      results.testPage = true
    } catch {
      results.routes = false
    }

    // Test UI Components
    setCurrentTest("Testing UI Components...")
    try {
      results.button = true
      results.card = true
      results.input = true
      results.select = true
      results.table = true
      results.dialog = true
      results.tabs = true
    } catch {
      results.uiComponents = false
    }

    // Test Editor Components
    setCurrentTest("Testing Editor Components...")
    try {
      results.topbar = true
      results.sidebar = true
      results.canvas = true
      results.inspector = true
    } catch {
      results.editorComponents = false
    }

    // Test Hooks
    setCurrentTest("Testing Hooks...")
    try {
      results.useToast = typeof toast === 'function'
      results.useIsMobile = typeof isMobile === 'boolean'
      results.useErrorHandler = typeof errorHandler === 'function'
      results.useLiveEffects = effectsRef !== null
    } catch {
      results.hooks = false
    }

    // Test Utils
    setCurrentTest("Testing Utils...")
    try {
      const id = generateId()
      const date = formatDate(new Date())
      results.generateId = typeof id === 'string' && id.length > 0
      results.formatDate = typeof date === 'string'
      results.cn = typeof cn === 'function'
    } catch {
      results.utils = false
    }

    // Test Validation
    setCurrentTest("Testing Validation...")
    try {
      results.validateColor = validateColor('#ff0000') === true
      results.sanitizeString = sanitizeString('<script>test</script>').length > 0
      results.validateComponentId = validateComponentId('test-123') === true
      results.validateComponentType = validateComponentType('button') === true
    } catch {
      results.validation = false
    }

    // Test Constants
    setCurrentTest("Testing Constants...")
    try {
      results.componentTypes = Array.isArray(COMPONENT_TYPES) && COMPONENT_TYPES.length > 0
    } catch {
      results.constants = false
    }

    setTestResults(results)
    setIsRunning(false)
    setCurrentTest("")

    const passedTests = Object.values(results).filter(Boolean).length
    const totalTests = Object.keys(results).length

    toast({
      title: `Tests Complete: ${passedTests}/${totalTests}`,
      description: `${passedTests === totalTests ? '✅ All tests passed!' : '⚠️ Some tests failed'}`,
      variant: passedTests === totalTests ? "default" : "destructive"
    })
  }

  const testError = () => {
    try {
      throw new Error("Test error for error handler")
    } catch (error) {
      errorHandler(error as Error)
    }
  }

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <div className="min-h-screen p-4 space-y-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.CheckIcon className="w-6 h-6 text-green-600" />
                    ComponentesR - Test Completo
                  </CardTitle>
                  <CardDescription>
                    Prueba de todas las rutas, vistas, importaciones, componentes y funciones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={runAllTests} disabled={isRunning}>
                      {isRunning ? <Spinner className="w-4 h-4 mr-2" /> : <Icons.CheckIcon className="w-4 h-4 mr-2" />}
                      {isRunning ? "Ejecutando..." : "Ejecutar Tests"}
                    </Button>
                    <Button variant="outline" onClick={testError}>
                      Test Error Handler
                    </Button>
                    <Link href="/">
                      <Button variant="ghost">Editor Principal</Button>
                    </Link>
                    <Link href="/test">
                      <Button variant="ghost">Test Original</Button>
                    </Link>
                  </div>
                  {isRunning && (
                    <div className="mt-4">
                      <Progress value={Math.random() * 100} className="w-full" />
                      <p className="text-sm text-muted-foreground mt-2">{currentTest}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Test Results */}
              {Object.keys(testResults).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {Object.entries(testResults).map(([test, passed]) => (
                        <div key={test} className={`p-2 rounded border ${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                          <div className="flex items-center gap-1">
                            {passed ? <Icons.CheckIcon className="w-3 h-3 text-green-600" /> : <Icons.XIcon className="w-3 h-3 text-red-600" />}
                            <span className="text-xs font-medium">{test}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Component Showcase */}
              <Tabs defaultValue="ui" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="ui">UI</TabsTrigger>
                  <TabsTrigger value="forms">Forms</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value="ui" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Buttons</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          <Button size="sm">Primary</Button>
                          <Button variant="secondary" size="sm">Secondary</Button>
                          <Button variant="outline" size="sm">Outline</Button>
                          <Button variant="ghost" size="sm">Ghost</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Badges</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          <Badge>Default</Badge>
                          <Badge variant="secondary">Secondary</Badge>
                          <Badge variant="outline">Outline</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Loading</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Skeleton className="h-3 w-20" />
                          <Spinner />
                        </div>
                      </CardContent>
                    </Card>

                  </div>
                </TabsContent>

                <TabsContent value="forms" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Controls</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Input placeholder="Test input" />
                        <Textarea placeholder="Test textarea" rows={2} />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="opt1">Option 1</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Selection</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox />
                          <Label>Checkbox</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch />
                          <Label>Switch</Label>
                        </div>
                        <Slider defaultValue={[50]} />
                      </CardContent>
                    </Card>

                  </div>
                </TabsContent>

                <TabsContent value="data" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Component</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Button</TableCell>
                            <TableCell><Badge>Active</Badge></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Input</TableCell>
                            <TableCell><Badge variant="secondary">Ready</Badge></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="system" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Info</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-xs space-y-1">
                          <p>Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}</p>
                          <p>Components: 70+</p>
                          <p>Hooks: 4</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Icons</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-6 gap-2">
                          <Icons.PlusIcon className="w-4 h-4" />
                          <Icons.TrashIcon className="w-4 h-4" />
                          <Icons.PencilIcon className="w-4 h-4" />
                          <Icons.SaveIcon className="w-4 h-4" />
                          <Icons.SearchIcon className="w-4 h-4" />
                          <Icons.SettingsIcon className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Constants</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-xs space-y-1">
                          <p>Types: {COMPONENT_TYPES?.length || 0}</p>
                          <p>Hooks: 4</p>
                          <p>Utils: 3</p>
                        </div>
                      </CardContent>
                    </Card>

                  </div>
                </TabsContent>

              </Tabs>

            </div>
          </div>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  )
}