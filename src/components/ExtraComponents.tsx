"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { Spinner } from "@/components/Spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

export function ExtraComponents() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(true)
    const [page, setPage] = useState(1)

    const simulateRequest = () => {
        setLoading(true)
        setShowAlert(false)

        setTimeout(() => {
            setLoading(false)
            setShowAlert(true)
        }, 2000)
    }

    return (
        <div className="space-y-6">
            {showAlert && (
                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Validación correcta</AlertTitle>
                    <AlertDescription>
                        Los datos fueron procesados correctamente en el dashboard.
                    </AlertDescription>
                </Alert>
            )}

            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Ejemplo de alerta</AlertTitle>
                <AlertDescription>
                    Este componente puede utilizarse para mostrar errores o validaciones
                    en formularios.
                </AlertDescription>
            </Alert>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-lg font-semibold">Spinner</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Simula una petición al backend.
                    </p>

                    <Button onClick={simulateRequest} disabled={loading}>
                        Simular petición
                    </Button>

                    <div className="mt-4">
                        {loading ? (
                            <Spinner text="Consultando datos..." />
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Presiona el botón para iniciar la carga.
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="mb-3 text-lg font-semibold">Calendar</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Selecciona una fecha para usarla en formularios o tareas.
                    </p>

                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />

                    <p className="mt-3 text-sm text-muted-foreground">
                        Fecha seleccionada:{" "}
                        {date ? date.toLocaleDateString() : "Ninguna"}
                    </p>
                </div>
            </div>

            <div className="rounded-lg border p-4">
                <h3 className="mb-3 text-lg font-semibold">Pagination</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                    Este componente permite dividir información en varias páginas.
                </p>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }}
                            />
                        </PaginationItem>

                        {[1, 2, 3].map((item) => (
                            <PaginationItem key={item}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === item}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setPage(item)
                                    }}
                                >
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage((prev) => Math.min(prev + 1, 3))
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <p className="mt-3 text-sm text-muted-foreground">
                    Página actual: {page}
                </p>
            </div>
        </div>
    )
}