// DOM Elements
const employeeForm = document.getElementById('employeeForm');
const editEmployeeForm = document.getElementById('editEmployeeForm');
const saveEmployeeBtn = document.getElementById('saveEmployee');
const updateEmployeeBtn = document.getElementById('updateEmployee');
const employeeTableBody = document.getElementById('employeeTableBody');

// Store work start times
const workStartTimes = new Map();

// Load employees when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    // Start the timer update interval
    setInterval(updateWorkTimers, 1000);
});

// Update work timers
function updateWorkTimers() {
    const now = new Date();
    workStartTimes.forEach((startTime, employeeId) => {
        const timerElement = document.getElementById(`work-timer-${employeeId}`);
        if (timerElement) {
            const elapsed = now - startTime;
            const hours = Math.floor(elapsed / (1000 * 60 * 60));
            const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    });
}

// Save new employee
saveEmployeeBtn.addEventListener('click', async () => {
    // Validate form
    if (!employeeForm.checkValidity()) {
        employeeForm.reportValidity();
        return;
    }

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        joinDate: document.getElementById('joinDate').value,
        role: document.getElementById('role').value.trim(),
        status: document.getElementById('status').value
    };

    try {
        // Show loading state
        saveEmployeeBtn.disabled = true;
        saveEmployeeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Send data to server
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Success - close modal and refresh table
            const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
            modal.hide();
            employeeForm.reset();
            await loadEmployees();
            showAlert('success', 'Employee added successfully!');
        } else {
            // Show error message
            showAlert('danger', result.error || 'Error adding employee');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('danger', 'Error adding employee. Please try again.');
    } finally {
        // Reset button state
        saveEmployeeBtn.disabled = false;
        saveEmployeeBtn.innerHTML = 'Save Employee';
    }
});

// Load employees from the server
async function loadEmployees() {
    try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
            throw new Error('Failed to fetch employees');
        }
        const employees = await response.json();
        
        employeeTableBody.innerHTML = '';
        
        if (employees.length === 0) {
            employeeTableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center">No employees found</td>
                </tr>
            `;
            return;
        }
        
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.employee_id}</td>
                <td>${employee.full_name}</td>
                <td>${employee.email}</td>
                <td>${employee.phone_number}</td>
                <td>${formatDate(employee.join_date)}</td>
                <td>${employee.role}</td>
                <td><span class="badge ${getStatusBadgeClass(employee.status)}">${employee.status}</span></td>
                <td id="work-timer-${employee.employee_id}">${formatWorkTime(employee.current_work_time)}</td>
                <td>
                    <button onclick="editEmployee(${employee.employee_id})" class="btn btn-sm btn-primary">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteEmployee(${employee.employee_id})" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            employeeTableBody.appendChild(row);

            // If employee is working, start their timer from the saved start time
            if (employee.status === 'Working' && employee.work_start_time) {
                workStartTimes.set(employee.employee_id, new Date(employee.work_start_time));
            }
        });
    } catch (error) {
        console.error('Error:', error);
        showAlert('danger', 'Error loading employees');
    }
}

// Format work time
function formatWorkTime(totalSeconds) {
    if (!totalSeconds) return '00:00:00';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'Working':
            return 'bg-success';
        case 'On Leave':
            return 'bg-warning';
        case 'Terminated':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

// Edit employee
async function editEmployee(id) {
    try {
        console.log(`Attempting to edit employee with ID: ${id}`);
        // Show loading state
        const editModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
        editModal.show();
        
        // Disable form while loading
        const form = document.getElementById('editEmployeeForm');
        const inputs = form.querySelectorAll('input, select');
        console.log(`Disabling ${inputs.length} inputs`);
        inputs.forEach(input => input.disabled = true);
        
        console.log('Fetching employee data...');
        const response = await fetch(`/api/employees/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch employee data');
        }
        const employee = await response.json();
        console.log('Employee data fetched:', employee);
        
        // Fill form with employee data
        document.getElementById('editEmployeeId').value = employee.employee_id;
        document.getElementById('editFullName').value = employee.full_name || '';
        document.getElementById('editEmail').value = employee.email || '';
        document.getElementById('editPhone').value = employee.phone_number || '';
        document.getElementById('editJoinDate').value = formatDateForInput(employee.join_date) || '';
        document.getElementById('editRole').value = employee.role || '';
        document.getElementById('editStatus').value = employee.status || 'Working';
        
        // Enable form after loading
        console.log(`Enabling ${inputs.length} inputs`);
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.remove('is-invalid'); // Remove validation class just in case
        });
        
        // Focus on first input
        document.getElementById('editFullName').focus();
        console.log('Edit modal ready.');
        
    } catch (error) {
        console.error('Error in editEmployee:', error);
        showAlert('danger', 'Error loading employee data');
        const modal = bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
        if (modal) {
            modal.hide();
        }
         // Also try to re-enable inputs on error just in case
        const form = document.getElementById('editEmployeeForm');
        if (form) {
            const inputs = form.querySelectorAll('input, select');
             inputs.forEach(input => input.disabled = false);
        }
    }
}

// Format date for input field
function formatDateForInput(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0];
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
}

// Update employee
updateEmployeeBtn.addEventListener('click', async () => {
    const form = document.getElementById('editEmployeeForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const id = document.getElementById('editEmployeeId').value;
    const formData = {
        fullName: document.getElementById('editFullName').value.trim(),
        email: document.getElementById('editEmail').value.trim(),
        phone: document.getElementById('editPhone').value.trim(),
        joinDate: document.getElementById('editJoinDate').value,
        role: document.getElementById('editRole').value.trim(),
        status: document.getElementById('editStatus').value
    };

    // Get current status and work time before update
    const currentRow = document.querySelector(`tr:has(#work-timer-${id})`);
    const oldStatus = currentRow.querySelector('.badge').textContent;
    const currentWorkTime = currentRow.querySelector(`#work-timer-${id}`).textContent;

    // Handle work timer based on status change only
    if (oldStatus !== 'Working' && formData.status === 'Working') {
        // Start timer if status changed to Working
        workStartTimes.set(id, new Date());
    } else if (oldStatus === 'Working' && formData.status !== 'Working') {
        // Stop timer if status changed from Working
        workStartTimes.delete(id);
    }

    try {
        // Show loading state
        updateEmployeeBtn.disabled = true;
        updateEmployeeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        
        // Disable form while updating
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => input.disabled = true);

        const response = await fetch(`/api/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal'));
            modal.hide();
            
            // Update only the changed row instead of reloading all employees
            const row = document.querySelector(`tr:has(#work-timer-${id})`);
            if (row) {
                row.querySelector('td:nth-child(2)').textContent = formData.fullName;
                row.querySelector('td:nth-child(3)').textContent = formData.email;
                row.querySelector('td:nth-child(4)').textContent = formData.phone;
                row.querySelector('td:nth-child(5)').textContent = formatDate(formData.joinDate);
                row.querySelector('td:nth-child(6)').textContent = formData.role;
                
                const statusBadge = row.querySelector('.badge');
                statusBadge.textContent = formData.status;
                statusBadge.className = `badge ${getStatusBadgeClass(formData.status)}`;
                
                // Keep the work timer value if status hasn't changed or if changing to/from Terminated
                if (oldStatus === formData.status || 
                    (oldStatus === 'Terminated' && formData.status === 'Working') ||
                    (oldStatus === 'Working' && formData.status === 'Terminated')) {
                    row.querySelector(`#work-timer-${id}`).textContent = currentWorkTime;
                }
            }
            
            showAlert('success', 'Employee updated successfully!');
        } else {
            showAlert('danger', result.error || 'Error updating employee');
            // Enable form on error
            inputs.forEach(input => input.disabled = false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('danger', 'Error updating employee');
        // Enable form on error
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => input.disabled = false);
    } finally {
        updateEmployeeBtn.disabled = false;
        updateEmployeeBtn.innerHTML = 'Update Employee';
    }
});

// Delete employee
async function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        try {
            const response = await fetch(`/api/employees/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadEmployees();
                showAlert('success', 'Employee deleted successfully!');
            } else {
                const result = await response.json();
                showAlert('danger', result.error || 'Error deleting employee');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('danger', 'Error deleting employee');
        }
    }
}

// Show alert message
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
} 