interface Task {
    title: string,
    description: string,
    category: {
        name: string;
        color: string;
        id: any
    },
    assigned_users: {}[],
    due_date: string,
    priority: string,
    subtasks: [],
    state: string,
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
    due_date: string
    priority: string
    subtasks: string[]
    state: string

    constructor(data?: Task) {
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