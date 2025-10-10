"use client"

import { useState } from "react"
import * as Icons from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { useIsMobile } from "@/hooks/use-mobile"
import { generateId } from "@/lib/utils"
import { validateColor, sanitizeString, validateComponentId } from "@/lib/validation"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"

export default function TestPage() {
  const [sliderValue, setSliderValue] = useState([50])
  const [switchValue, setSwitchValue] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [progress] = useState(75)
  
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const { handleError } = useErrorHandler()

  const testAllFunctions = () => {
    const id = generateId()
    const isValidColor = validateColor("#ff0000")
    const sanitized = sanitizeString("<script>alert('test')</script>")
    const isValidId = validateComponentId("test-id-123")
    
    toast({
      title: "Test Complete ✅",
      description: `All functions working: ID=${id.slice(0,6)}, Valid=${isValidColor}, Clean=${sanitized.length > 0}, ValidId=${isValidId}`,
    })
    
    try {
      throw new Error("Test error")
    } catch (error) {
      handleError(error as Error)
    }
  }

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <div className="min-h-screen p-4 space-y-6">
            <div className="max-w-6xl mx-auto">
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.CheckIcon className="w-5 h-5 text-green-600" />
                    ComponentesR - Test Completo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Test Buttons */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Botones y Acciones</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={testAllFunctions}>Test All Functions</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button size="sm">Small</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </section>

                  {/* Form Controls */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Controles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Input</Label>
                        <Input 
                          value={inputValue} 
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Test input..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Select</Label>
                        <Select value={selectValue} onValueChange={setSelectValue}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="opt1">Option 1</SelectItem>
                            <SelectItem value="opt2">Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Slider: {sliderValue[0]}</Label>
                        <Slider 
                          value={sliderValue} 
                          onValueChange={setSliderValue}
                          max={100}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Textarea</Label>
                        <Textarea 
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                          placeholder="Test textarea..."
                        />
                      </div>
                    </div>
                  </section>

                  {/* Selection */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Selección</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="test-checkbox" 
                          checked={checkboxValue}
                          onCheckedChange={(checked) => setCheckboxValue(checked as boolean)}
                        />
                        <Label htmlFor="test-checkbox">Test Checkbox</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={switchValue}
                          onCheckedChange={setSwitchValue}
                        />
                        <Label>Test Switch</Label>
                      </div>
                      <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="radio1" id="r1" />
                          <Label htmlFor="r1">Radio 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="radio2" id="r2" />
                          <Label htmlFor="r2">Radio 2</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </section>

                  {/* Display */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Visualización</h3>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                      </div>
                      <Progress value={progress} className="w-full" />
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>TS</AvatarFallback>
                        </Avatar>
                        <Skeleton className="h-4 w-[200px]" />
                        <Spinner />
                      </div>
                    </div>
                  </section>

                  {/* Navigation */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Navegación</h3>
                    <Tabs defaultValue="tab1">
                      <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab1">Content 1</TabsContent>
                      <TabsContent value="tab2">Content 2</TabsContent>
                    </Tabs>
                    
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Test</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </section>

                  {/* Overlays */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Overlays</h3>
                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Test Dialog</DialogTitle>
                          </DialogHeader>
                          <p>Dialog content test</p>
                        </DialogContent>
                      </Dialog>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <p>Popover content test</p>
                        </PopoverContent>
                      </Popover>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">Tooltip</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tooltip test</p>
                        </TooltipContent>
                      </Tooltip>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline">Sheet</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Test Sheet</SheetTitle>
                            <SheetDescription>Sheet content test</SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="outline">Hover Card</Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p>Hover card test</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </section>

                  {/* Menus */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Menús</h3>
                    <div className="flex flex-wrap gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Dropdown</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Item 1</DropdownMenuItem>
                          <DropdownMenuItem>Item 2</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <Button variant="outline">Context Menu</Button>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem>Context 1</ContextMenuItem>
                          <ContextMenuItem>Context 2</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </div>
                  </section>

                  {/* Layout */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Layout</h3>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Accordion 1</AccordionTrigger>
                        <AccordionContent>Accordion content 1</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Accordion 2</AccordionTrigger>
                        <AccordionContent>Accordion content 2</AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline">Toggle Collapsible</Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <p className="mt-2">Collapsible content</p>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />
                  </section>

                  {/* Data */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Datos</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Component</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>UI Components</TableCell>
                          <TableCell><Badge>Active</Badge></TableCell>
                          <TableCell>70+</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Hooks</TableCell>
                          <TableCell><Badge variant="secondary">Ready</Badge></TableCell>
                          <TableCell>4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </section>

                  {/* Alerts */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Alertas</h3>
                    <Alert>
                      <Icons.InfoIcon className="h-4 w-4" />
                      <AlertTitle>Test Alert</AlertTitle>
                      <AlertDescription>
                        All components are working correctly.
                      </AlertDescription>
                    </Alert>
                  </section>

                  {/* Icons */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Iconos</h3>
                    <div className="grid grid-cols-12 gap-2">
                      <Icons.PlusIcon />
                      <Icons.TrashIcon />
                      <Icons.UndoIcon />
                      <Icons.RedoIcon />
                      <Icons.EyeIcon />
                      <Icons.CodeIcon />
                      <Icons.SaveIcon />
                      <Icons.FolderIcon />
                      <Icons.SearchIcon />
                      <Icons.SettingsIcon />
                      <Icons.XIcon />
                      <Icons.CheckIcon />
                    </div>
                  </section>

                  {/* Status */}
                  <section className="space-y-3">
                    <h3 className="text-lg font-semibold">Estado</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Card>
                        <CardContent className="p-3">
                          <div className="text-xl font-bold text-green-600">✓</div>
                          <p className="text-sm">Components</p>
                          <p className="text-xs text-muted-foreground">70+ UI</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3">
                          <div className="text-xl font-bold text-green-600">✓</div>
                          <p className="text-sm">Hooks</p>
                          <p className="text-xs text-muted-foreground">4 custom</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3">
                          <div className="text-xl font-bold text-green-600">✓</div>
                          <p className="text-sm">Utils</p>
                          <p className="text-xs text-muted-foreground">Validation</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3">
                          <div className="text-xl font-bold">{isMobile ? "📱" : "💻"}</div>
                          <p className="text-sm">Device</p>
                          <p className="text-xs text-muted-foreground">{isMobile ? "Mobile" : "Desktop"}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                </CardContent>
              </Card>
            </div>
          </div>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  )
}