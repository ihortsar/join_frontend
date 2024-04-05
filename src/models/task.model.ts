interface Task {
    id: number
    title: string,
    description: string,
    category: {
        name: string;
        color: string;
        id: any
    },
    assigned_users: {}[],
    due_date: any,
    priority: string,
    subtasks: {}[],
    state: string,
}

export interface Subtask {
    text: string;
    checked: boolean;
}

export class JoinTask {
    title: string
    description: string
    category: {
        name: string;
        color: string;
        id: any
    }
    assigned_users: {}[]
    due_date: any
    priority: string
    subtasks: {}[]
    state: string
    id: number
    constructor(data?: Task) {
        this.id = data?.id || -1;
        this.title = data?.title || '';
        this.description = data?.description || '';
        this.category = data?.category || {
            name: '',
            color: '',
            id: null,
        };
        this.assigned_users = data?.assigned_users || [];
        this.due_date = data?.due_date || '';
        this.priority = data?.priority || '';
        this.subtasks = data?.subtasks || []
        this.state = data?.state || 'toDo';
    }
}