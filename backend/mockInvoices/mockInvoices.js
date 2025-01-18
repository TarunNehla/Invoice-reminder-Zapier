
const generateMockInvoices = (userId) => {
    const now = new Date();
    return [
        {
            userId,
            email : 'apj15wof@gmail.com',
            amount: 100.0,
            dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
            recipient: 'John Doe',
            status: 'Pending',
        },
        {
            userId,
            email : 'sample@gmail.com',
            amount: 200.0,
            dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7), 
            recipient: 'Jane Smith',
            status: 'Pending',
        },
        {
            userId,
            email : 'sample@gmail.com',
            amount: 300.0,
            dueDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14), 
            recipient: 'Acme Corp',
            status: 'Pending',
        },
    ];
};

module.exports = generateMockInvoices;