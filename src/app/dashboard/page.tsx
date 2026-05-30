"use client"

import { useState } from "react"
import { ExtraComponents } from "@/components/ExtraComponents"
import { ProjectForm } from "@/components/ProjectForm"
import { TasksTable } from "@/components/TaskTable"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const initialProjects = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "Plataforma de comercio electrónico con Next.js",
        status: "En progreso",
        progress: 65,
        team: 5,
        members: [1, 2],
    },
    {
        id: 2,
        title: "Mobile App",
        description: "Aplicación móvil con React Native",
        status: "En revisión",
        progress: 90,
        team: 3,
        members: [3],
    },
    {
        id: 3,
        title: "Dashboard Analytics",
        description: "Panel de análisis con visualizaciones",
        status: "Planificado",
        progress: 20,
        team: 4,
        members: [1, 3],
    },
    {
        id: 4,
        title: "API Gateway",
        description: "Microservicios con Node.js",
        status: "En progreso",
        progress: 45,
        team: 6,
        members: [2],
    },
    {
        id: 5,
        title: "Design System",
        description: "Librería de componentes reutilizables",
        status: "Completado",
        progress: 100,
        team: 2,
        members: [3],
    },
    {
        id: 6,
        title: "Marketing Website",
        description: "Sitio web institucional",
        status: "En progreso",
        progress: 75,
        team: 3,
        members: [1],
    },
]

const initialTeamMembers = [
    {
        userId: 1,
        role: "Frontend Developer",
        name: "María García",
        email: "maria@example.com",
        position: "Desarrolladora Frontend",
        birthdate: "1998-05-12",
        phone: "987654321",
        projectId: 1,
        isActive: true,
    },
    {
        userId: 2,
        role: "Backend Developer",
        name: "Juan Pérez",
        email: "juan@example.com",
        position: "Desarrollador Backend",
        birthdate: "1997-08-20",
        phone: "912345678",
        projectId: 4,
        isActive: true,
    },
    {
        userId: 3,
        role: "UI/UX Designer",
        name: "Ana López",
        email: "ana@example.com",
        position: "Diseñadora UI/UX",
        birthdate: "1999-02-15",
        phone: "923456789",
        projectId: 3,
        isActive: false,
    },
]

const initialTasks = [
    {
        id: 1,
        description: "Implementar autenticación",
        projectId: 1,
        status: "En progreso",
        priority: "Alta",
        userId: 1,
        deadline: "2025-11-15",
    },
    {
        id: 2,
        description: "Diseñar pantalla de perfil",
        projectId: 2,
        status: "Pendiente",
        priority: "Media",
        userId: 3,
        deadline: "2025-11-20",
    },
    {
        id: 3,
        description: "Configurar CI/CD",
        projectId: 4,
        status: "Completado",
        priority: "Alta",
        userId: 2,
        deadline: "2025-11-10",
    },
    {
        id: 4,
        description: "Optimizar queries SQL",
        projectId: 1,
        status: "En progreso",
        priority: "Urgente",
        userId: 2,
        deadline: "2025-11-12",
    },
    {
        id: 5,
        description: "Documentar API endpoints",
        projectId: 4,
        status: "Pendiente",
        priority: "Baja",
        userId: 1,
        deadline: "2025-11-25",
    },
]

export default function DashboardPage() {
    const [projects, setProjects] = useState(initialProjects)
    const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<(typeof initialProjects)[0] | null>(null)

    const [projectForm, setProjectForm] = useState({
        title: "",
        description: "",
        status: "",
        progress: "",
        members: [] as number[],
    })
    const [members, setMembers] = useState(initialTeamMembers)
    const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
    const [editingMember, setEditingMember] = useState<(typeof initialTeamMembers)[0] | null>(null)

    const [memberForm, setMemberForm] = useState({
        role: "",
        name: "",
        email: "",
        position: "",
        birthdate: "",
        phone: "",
        projectId: "",
        isActive: true,
    })
    const [notifications, setNotifications] = useState(true)
    const [publicProfile, setPublicProfile] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const handleViewDetails = (project: (typeof initialProjects)[0]) => {
        alert(
            `Detalles del proyecto:\n\nNombre: ${project.title}\nDescripción: ${project.description}\nEstado: ${project.status}\nProgreso: ${project.progress}%\nEquipo: ${project.team} miembros`
        )
    }

    const handleDeleteProject = (id: number) => {
        const confirmDelete = confirm("¿Estás seguro de eliminar este proyecto?")

        if (confirmDelete) {
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== id)
            )
        }
    }

    const handleAddProject = (newProject: {
        title: string
        description: string
        status: string
        progress: number
        team: number
    }) => {
        const project = {
            id: Date.now(),
            ...newProject,
            members: [],
        }

        setProjects((prevProjects) => [...prevProjects, project])
    }

    const handleSaveSettings = () => {
        alert(
            `Configuración guardada:\n\nNotificaciones: ${notifications ? "Activadas" : "Desactivadas"
            }\nPerfil público: ${publicProfile ? "Sí" : "No"
            }\nModo oscuro: ${darkMode ? "Activado" : "Desactivado"}`
        )
    }
    const resetMemberForm = () => {
        setMemberForm({
            role: "",
            name: "",
            email: "",
            position: "",
            birthdate: "",
            phone: "",
            projectId: "",
            isActive: true,
        })
        setEditingMember(null)
    }

    const handleOpenCreateMember = () => {
        resetMemberForm()
        setIsMemberDialogOpen(true)
    }

    const handleOpenEditMember = (member: (typeof initialTeamMembers)[0]) => {
        setEditingMember(member)
        setMemberForm({
            role: member.role,
            name: member.name,
            email: member.email,
            position: member.position,
            birthdate: member.birthdate,
            phone: member.phone,
            projectId: String(member.projectId),
            isActive: member.isActive,
        })
        setIsMemberDialogOpen(true)
    }

    const handleSaveMember = () => {
        if (!memberForm.name || !memberForm.email || !memberForm.role) {
            alert("Completa nombre, email y rol")
            return
        }

        if (editingMember) {
            setMembers((prevMembers) =>
                prevMembers.map((member) =>
                    member.userId === editingMember.userId
                        ? {
                            ...member,
                            role: memberForm.role,
                            name: memberForm.name,
                            email: memberForm.email,
                            position: memberForm.position,
                            birthdate: memberForm.birthdate,
                            phone: memberForm.phone,
                            projectId: Number(memberForm.projectId),
                            isActive: memberForm.isActive,
                        }
                        : member
                )
            )

            alert("Miembro actualizado correctamente")
        } else {
            const newMember = {
                userId: Date.now(),
                role: memberForm.role,
                name: memberForm.name,
                email: memberForm.email,
                position: memberForm.position,
                birthdate: memberForm.birthdate,
                phone: memberForm.phone,
                projectId: Number(memberForm.projectId),
                isActive: memberForm.isActive,
            }

            setMembers((prevMembers) => [...prevMembers, newMember])
            alert("Miembro creado correctamente")
        }

        resetMemberForm()
        setIsMemberDialogOpen(false)
    }

    const handleDeleteMember = (userId: number) => {
        const confirmDelete = confirm("¿Estás seguro de eliminar este miembro?")

        if (confirmDelete) {
            setMembers((prevMembers) =>
                prevMembers.filter((member) => member.userId !== userId)
            )
        }
    }

    const [tasks, setTasks] = useState(initialTasks)
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<(typeof initialTasks)[0] | null>(null)
    const [currentTaskPage, setCurrentTaskPage] = useState(1)

    const [taskForm, setTaskForm] = useState({
        description: "",
        projectId: "",
        status: "",
        priority: "",
        userId: "",
        deadline: "",
    })


    const resetTaskForm = () => {
        setTaskForm({
            description: "",
            projectId: "",
            status: "",
            priority: "",
            userId: "",
            deadline: "",
        })
        setEditingTask(null)
    }

    const handleOpenCreateTask = () => {
        resetTaskForm()
        setIsTaskDialogOpen(true)
    }

    const handleOpenEditTask = (task: (typeof initialTasks)[0]) => {
        setEditingTask(task)
        setTaskForm({
            description: task.description,
            projectId: String(task.projectId),
            status: task.status,
            priority: task.priority,
            userId: String(task.userId),
            deadline: task.deadline,
        })
        setIsTaskDialogOpen(true)
    }

    const handleSaveTask = () => {
        if (
            !taskForm.description ||
            !taskForm.projectId ||
            !taskForm.status ||
            !taskForm.priority ||
            !taskForm.userId ||
            !taskForm.deadline
        ) {
            alert("Completa todos los campos de la tarea")
            return
        }

        if (editingTask) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editingTask.id
                        ? {
                            ...task,
                            description: taskForm.description,
                            projectId: Number(taskForm.projectId),
                            status: taskForm.status,
                            priority: taskForm.priority,
                            userId: Number(taskForm.userId),
                            deadline: taskForm.deadline,
                        }
                        : task
                )
            )

            alert("Tarea actualizada correctamente")
        } else {
            const newTask = {
                id: Date.now(),
                description: taskForm.description,
                projectId: Number(taskForm.projectId),
                status: taskForm.status,
                priority: taskForm.priority,
                userId: Number(taskForm.userId),
                deadline: taskForm.deadline,
            }

            setTasks((prevTasks) => [...prevTasks, newTask])
            alert("Tarea creada correctamente")
        }

        resetTaskForm()
        setIsTaskDialogOpen(false)
    }

    const handleDeleteTask = (id: number) => {
        const confirmDelete = confirm("¿Estás seguro de eliminar esta tarea?")

        if (confirmDelete) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
        }
    }
    const resetProjectForm = () => {
        setProjectForm({
            title: "",
            description: "",
            status: "",
            progress: "",
            members: [],
        })
        setEditingProject(null)
    }

    const handleOpenEditProject = (project: (typeof initialProjects)[0]) => {
        setEditingProject(project)
        setProjectForm({
            title: project.title,
            description: project.description,
            status: project.status,
            progress: String(project.progress),
            members: project.members || [],
        })
        setIsProjectDialogOpen(true)
    }

    const handleSaveProject = () => {
        if (!projectForm.title || !projectForm.description || !projectForm.status) {
            alert("Completa título, descripción y estado")
            return
        }

        if (editingProject) {
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === editingProject.id
                        ? {
                            ...project,
                            title: projectForm.title,
                            description: projectForm.description,
                            status: projectForm.status,
                            progress: Number(projectForm.progress),
                            team: projectForm.members.length,
                            members: projectForm.members,
                        }
                        : project
                )
            )

            alert("Proyecto actualizado correctamente")
        }

        resetProjectForm()
        setIsProjectDialogOpen(false)
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">
                            Dashboard de Proyectos
                        </h1>
                        <p className="text-slate-600">
                            Gestiona tus proyectos y tareas con shadcn/ui
                        </p>
                    </div>

                    <ProjectForm onAddProject={handleAddProject} />
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Resumen</TabsTrigger>
                        <TabsTrigger value="projects">Proyectos</TabsTrigger>
                        <TabsTrigger value="team">Equipo</TabsTrigger>
                        <TabsTrigger value="tasks">Tareas</TabsTrigger>
                        <TabsTrigger value="settings">Configuración</TabsTrigger>
                        <TabsTrigger value="extras">Extras</TabsTrigger>
                    </TabsList>






                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">
                                        Total Proyectos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{projects.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Proyectos registrados actualmente
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">
                                        Tareas Completadas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">143</div>
                                    <p className="text-xs text-muted-foreground">
                                        +19% desde la semana pasada
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">
                                        Horas Trabajadas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">324h</div>
                                    <p className="text-xs text-muted-foreground">
                                        +12h desde ayer
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">
                                        Miembros Activos
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {members.filter((member) => member.isActive).length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Miembros disponibles
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Actividad Reciente</CardTitle>
                                <CardDescription>
                                    Últimas actualizaciones de tus proyectos
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            user: "María García",
                                            action: "completó la tarea",
                                            task: "Diseño de UI",
                                            time: "Hace 5 min",
                                        },
                                        {
                                            user: "Juan Pérez",
                                            action: "comentó en",
                                            task: "API Backend",
                                            time: "Hace 1 hora",
                                        },
                                        {
                                            user: "Ana López",
                                            action: "creó un nuevo",
                                            task: "Proyecto Mobile",
                                            time: "Hace 2 horas",
                                        },
                                        {
                                            user: "Carlos Ruiz",
                                            action: "actualizó",
                                            task: "Documentación",
                                            time: "Hace 3 horas",
                                        },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback>{activity.user[0]}</AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {activity.user}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {activity.action}{" "}
                                                    <span className="font-medium">{activity.task}</span>
                                                </p>
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                {activity.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <Card key={project.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <CardTitle className="text-lg">
                                                    {project.title}
                                                </CardTitle>
                                                <CardDescription>
                                                    {project.description}
                                                </CardDescription>
                                            </div>

                                            <Badge
                                                variant={
                                                    project.status === "Completado"
                                                        ? "default"
                                                        : project.status === "En revisión"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {project.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <span className="text-muted-foreground">
                                                        Progreso
                                                    </span>
                                                    <span className="font-medium">
                                                        {project.progress}%
                                                    </span>
                                                </div>

                                                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary transition-all"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-muted-foreground">
                                                    {project.team} miembros
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleViewDetails(project)}
                                                    >
                                                        Ver detalles
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleOpenEditProject(project)}
                                                    >
                                                        Editar
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDeleteProject(project.id)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                            <DialogContent className="sm:max-w-[550px]">
                                <DialogHeader>
                                    <DialogTitle>Editar proyecto</DialogTitle>
                                    <DialogDescription>
                                        Modifica los datos del proyecto seleccionado.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Título</Label>
                                        <Input
                                            value={projectForm.title}
                                            onChange={(e) =>
                                                setProjectForm({ ...projectForm, title: e.target.value })
                                            }
                                            placeholder="Nombre del proyecto"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Descripción</Label>
                                        <Input
                                            value={projectForm.description}
                                            onChange={(e) =>
                                                setProjectForm({ ...projectForm, description: e.target.value })
                                            }
                                            placeholder="Descripción del proyecto"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Estado</Label>
                                        <Select
                                            value={projectForm.status}
                                            onValueChange={(value) =>
                                                setProjectForm({ ...projectForm, status: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Planificado">Planificado</SelectItem>
                                                <SelectItem value="En progreso">En progreso</SelectItem>
                                                <SelectItem value="En revisión">En revisión</SelectItem>
                                                <SelectItem value="Completado">Completado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Progreso</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={projectForm.progress}
                                            onChange={(e) =>
                                                setProjectForm({ ...projectForm, progress: e.target.value })
                                            }
                                            placeholder="0 - 100"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Miembros asignados</Label>

                                        <div className="space-y-2 rounded-lg border p-3">
                                            {members.map((member) => (
                                                <label
                                                    key={member.userId}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={projectForm.members.includes(member.userId)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setProjectForm({
                                                                    ...projectForm,
                                                                    members: [...projectForm.members, member.userId],
                                                                })
                                                            } else {
                                                                setProjectForm({
                                                                    ...projectForm,
                                                                    members: projectForm.members.filter(
                                                                        (id) => id !== member.userId
                                                                    ),
                                                                })
                                                            }
                                                        }}
                                                    />
                                                    {member.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            resetProjectForm()
                                            setIsProjectDialogOpen(false)
                                        }}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button onClick={handleSaveProject}>
                                        Guardar cambios
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsContent>

                    <TabsContent value="team" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Miembros del Equipo</CardTitle>
                                        <CardDescription>
                                            Gestiona los miembros de tu equipo y sus roles
                                        </CardDescription>
                                    </div>

                                    <Button onClick={handleOpenCreateMember}>
                                        Nuevo miembro
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {members.map((member) => (
                                        <div
                                            key={member.userId}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {member.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <p className="text-sm font-medium">{member.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {member.position}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {member.email}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Teléfono: {member.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Badge variant={member.isActive ? "default" : "secondary"}>
                                                    {member.isActive ? "Activo" : "Inactivo"}
                                                </Badge>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleOpenEditMember(member)}
                                                >
                                                    Editar
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteMember(member.userId)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
                            <DialogContent className="sm:max-w-[550px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingMember ? "Editar miembro" : "Nuevo miembro"}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Completa la información del miembro del equipo.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Nombre</Label>
                                        <Input
                                            value={memberForm.name}
                                            onChange={(e) =>
                                                setMemberForm({ ...memberForm, name: e.target.value })
                                            }
                                            placeholder="Nombre completo"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={memberForm.email}
                                            onChange={(e) =>
                                                setMemberForm({ ...memberForm, email: e.target.value })
                                            }
                                            placeholder="correo@example.com"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Rol</Label>
                                        <Input
                                            value={memberForm.role}
                                            onChange={(e) =>
                                                setMemberForm({ ...memberForm, role: e.target.value })
                                            }
                                            placeholder="Frontend Developer"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Posición</Label>
                                        <Input
                                            value={memberForm.position}
                                            onChange={(e) =>
                                                setMemberForm({ ...memberForm, position: e.target.value })
                                            }
                                            placeholder="Desarrollador Frontend"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Fecha de nacimiento</Label>
                                        <Input
                                            type="date"
                                            value={memberForm.birthdate}
                                            onChange={(e) =>
                                                setMemberForm({ ...memberForm, birthdate: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Teléfono</Label>
                                        <Input
                                            value={memberForm.phone}
                                            onChange={(e) =>
                                                setMemberForm({ ...memberForm, phone: e.target.value })
                                            }
                                            placeholder="987654321"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Proyecto asignado</Label>
                                        <Select
                                            value={memberForm.projectId}
                                            onValueChange={(value) =>
                                                setMemberForm({ ...memberForm, projectId: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un proyecto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {projects.map((project) => (
                                                    <SelectItem key={project.id} value={String(project.id)}>
                                                        {project.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Estado</Label>
                                        <Select
                                            value={memberForm.isActive ? "activo" : "inactivo"}
                                            onValueChange={(value) =>
                                                setMemberForm({
                                                    ...memberForm,
                                                    isActive: value === "activo",
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="activo">Activo</SelectItem>
                                                <SelectItem value="inactivo">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            resetMemberForm()
                                            setIsMemberDialogOpen(false)
                                        }}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button onClick={handleSaveMember}>
                                        {editingMember ? "Guardar cambios" : "Crear miembro"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsContent>

                    <TabsContent value="tasks" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Gestión de Tareas</CardTitle>
                                        <CardDescription>
                                            Administra todas las tareas de tus proyectos
                                        </CardDescription>
                                    </div>

                                    <Button onClick={handleOpenCreateTask}>
                                        Nueva tarea
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <TasksTable
                                    tasks={tasks}
                                    projects={projects}
                                    members={members}
                                    currentPage={currentTaskPage}
                                    onPageChange={setCurrentTaskPage}
                                    onEditTask={handleOpenEditTask}
                                    onDeleteTask={handleDeleteTask}
                                />
                            </CardContent>
                        </Card>

                        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
                            <DialogContent className="sm:max-w-[550px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        {editingTask ? "Editar tarea" : "Nueva tarea"}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Completa la información de la tarea.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Descripción</Label>
                                        <Input
                                            value={taskForm.description}
                                            onChange={(e) =>
                                                setTaskForm({ ...taskForm, description: e.target.value })
                                            }
                                            placeholder="Descripción de la tarea"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Proyecto</Label>
                                        <Select
                                            value={taskForm.projectId}
                                            onValueChange={(value) =>
                                                setTaskForm({ ...taskForm, projectId: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un proyecto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {projects.map((project) => (
                                                    <SelectItem key={project.id} value={String(project.id)}>
                                                        {project.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Estado</Label>
                                        <Select
                                            value={taskForm.status}
                                            onValueChange={(value) =>
                                                setTaskForm({ ...taskForm, status: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                <SelectItem value="En progreso">En progreso</SelectItem>
                                                <SelectItem value="Completado">Completado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Prioridad</Label>
                                        <Select
                                            value={taskForm.priority}
                                            onValueChange={(value) =>
                                                setTaskForm({ ...taskForm, priority: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona prioridad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Baja">Baja</SelectItem>
                                                <SelectItem value="Media">Media</SelectItem>
                                                <SelectItem value="Alta">Alta</SelectItem>
                                                <SelectItem value="Urgente">Urgente</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Asignado a</Label>
                                        <Select
                                            value={taskForm.userId}
                                            onValueChange={(value) =>
                                                setTaskForm({ ...taskForm, userId: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un miembro" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {members.map((member) => (
                                                    <SelectItem key={member.userId} value={String(member.userId)}>
                                                        {member.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Fecha límite</Label>
                                        <Input
                                            type="date"
                                            value={taskForm.deadline}
                                            onChange={(e) =>
                                                setTaskForm({ ...taskForm, deadline: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            resetTaskForm()
                                            setIsTaskDialogOpen(false)
                                        }}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button onClick={handleSaveTask}>
                                        {editingTask ? "Guardar cambios" : "Crear tarea"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuración</CardTitle>
                                <CardDescription>
                                    Administra las preferencias generales del dashboard
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <Label className="text-base">Notificaciones</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recibir alertas sobre proyectos y tareas.
                                        </p>
                                    </div>

                                    <Switch
                                        checked={notifications}
                                        onCheckedChange={setNotifications}
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <Label className="text-base">Perfil público</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Permitir que otros miembros vean tu perfil.
                                        </p>
                                    </div>

                                    <Switch
                                        checked={publicProfile}
                                        onCheckedChange={setPublicProfile}
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div>
                                        <Label className="text-base">Modo oscuro</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Activar apariencia oscura en el dashboard.
                                        </p>
                                    </div>

                                    <Switch
                                        checked={darkMode}
                                        onCheckedChange={setDarkMode}
                                    />
                                </div>

                                <Button onClick={handleSaveSettings}>
                                    Guardar configuración
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="extras">
                        <Card>
                            <CardHeader>
                                <CardTitle>Componentes adicionales</CardTitle>
                                <CardDescription>
                                    Implementación de Spinner, Alert, Calendar y Pagination.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <ExtraComponents />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}