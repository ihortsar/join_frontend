interface Task {
    title: string,
    description: string,
    category: {
        name: string;
        color: string;
    },
    assigned_users: {}[],
    due_date: string,
    priority: string,
    subtasks: []

}

export class JoinTask {
    title: string
    description: string
    category: {
        name: string;
        color: string;
    }
    assigned_users: {}[]
    due_date: string
    priority: string
    subtasks: string[]

    constructor(data?: Task) {
        this.title = data?.title || '';
        this.description = data?.description || '';
        this.category = data?.category || {
            name: '',
            color: ''
        };
        this.assigned_users = data?.assigned_users || [];
        this.due_date = data?.due_date || '';
        this.priority = data?.priority || '';
        this.subtasks = data?.subtasks || []

    }
}