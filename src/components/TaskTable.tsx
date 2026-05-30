"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type Task = {
    id: number
    description: string
    projectId: number
    status: string
    priority: string
    userId: number
    deadline: string
}

type Project = {
    id: number
    title: string
}

type Member = {
    userId: number
    name: string
}

interface TasksTableProps {
    tasks: Task[]
    projects: Project[]
    members: Member[]
    currentPage: number
    onPageChange: (page: number) => void
    onEditTask: (task: Task) => void
    onDeleteTask: (id: number) => void
}

const statusVariant = (status: string) => {
    switch (status) {
        case "Completado":
            return "default"
        case "En progreso":
            return "secondary"
        case "Pendiente":
            return "outline"
        default:
            return "outline"
    }
}

const priorityVariant = (priority: string) => {
    switch (priority) {
        case "Urgente":
            return "destructive"
        case "Alta":
            return "default"
        case "Media":
            return "secondary"
        case "Baja":
            return "outline"
        default:
            return "outline"
    }
}

export function TasksTable({
    tasks,
    projects,
    members,
    currentPage,
    onPageChange,
    onEditTask,
    onDeleteTask,
}: TasksTableProps) {
    const tasksPerPage = 3
    const totalPages = Math.ceil(tasks.length / tasksPerPage)

    const startIndex = (currentPage - 1) * tasksPerPage
    const paginatedTasks = tasks.slice(startIndex, startIndex + tasksPerPage)

    const getProjectName = (projectId: number) => {
        return projects.find((project) => project.id === projectId)?.title || "Sin proyecto"
    }

    const getMemberName = (userId: number) => {
        return members.find((member) => member.userId === userId)?.name || "Sin asignar"
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableCaption>Lista de tareas del proyecto con paginación</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox />
                            </TableHead>
                            <TableHead>Tarea</TableHead>
                            <TableHead>Proyecto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Prioridad</TableHead>
                            <TableHead>Asignado a</TableHead>
                            <TableHead>Fecha límite</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedTasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                <TableCell className="font-medium">
                                    {task.description}
                                </TableCell>

                                <TableCell>
                                    {getProjectName(task.projectId)}
                                </TableCell>

                                <TableCell>
                                    <Badge variant={statusVariant(task.status)}>
                                        {task.status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge variant={priorityVariant(task.priority)}>
                                        {task.priority}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {getMemberName(task.userId)}
                                </TableCell>

                                <TableCell>
                                    {task.deadline}
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEditTask(task)}
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onDeleteTask(task.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(Math.max(currentPage - 1, 1))
                                }}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, index) => {
                            const page = index + 1

                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === page}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onPageChange(page)
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(Math.min(currentPage + 1, totalPages))
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}