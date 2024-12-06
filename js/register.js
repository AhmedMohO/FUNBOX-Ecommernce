var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthManager } from '../data/authmanager.js';
// Form Configurations
const LOGIN_FORM_CONFIG = {
    id: 'loginForm',
    title: 'Login',
    fields: [
        { type: 'email', id: 'loginEmail', name: 'email', label: 'Email', required: true },
        { type: 'password', id: 'loginPassword', name: 'password', label: 'Password', required: true }
    ],
    submitText: 'Login'
};
const REGISTER_FORM_CONFIG = {
    id: 'registerForm',
    title: 'Register',
    fields: [
        { type: 'text', id: 'username', name: 'username', label: 'Username', required: true },
        { type: 'email', id: 'registerEmail', name: 'email', label: 'Email', required: true },
        { type: 'password', id: 'registerPassword', name: 'password', label: 'Password', required: true },
        { type: 'password', id: 'confirmPassword', name: 'confirmPassword', label: 'Confirm Password', required: true }
    ],
    submitText: 'Register'
};
// Form Generator Class
class FormGenerator {
    constructor(containerId) {
        this.currentForm = null;
        this.handleConfirmPasswordInput = (e) => {
            var _a;
            const confirmPassword = e.target.value;
            const password = (_a = document.getElementById('registerPassword')) === null || _a === void 0 ? void 0 : _a.value;
            if (confirmPassword && password !== confirmPassword) {
                this.showError('confirmPassword', 'Passwords do not match');
            }
            else {
                this.hideError('confirmPassword');
            }
        };
        const container = document.getElementById(containerId);
        if (!container)
            throw new Error('Container not found');
        this.container = container;
    }
    generateField(field) {
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'form-input-material';
        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.name;
        input.className = 'form-control-material';
        input.required = field.required || false;
        input.placeholder = ' ';
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.id = `${field.id}Error`;
        fieldContainer.appendChild(input);
        fieldContainer.appendChild(label);
        return { fieldContainer, errorDiv };
    }
    generateForm(config) {
        const form = document.createElement('form');
        form.className = 'form';
        form.id = config.id;
        const title = document.createElement('h1');
        title.textContent = config.title;
        form.appendChild(title);
        config.fields.forEach(field => {
            const { fieldContainer, errorDiv } = this.generateField(field);
            form.appendChild(fieldContainer);
            form.appendChild(errorDiv);
        });
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'checkout-btn';
        submitButton.textContent = config.submitText;
        form.appendChild(submitButton);
        return form;
    }
    switchForm(formType) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = formType === 'login' ? LOGIN_FORM_CONFIG : REGISTER_FORM_CONFIG;
            if (this.currentForm === formType)
                return;
            const newForm = this.generateForm(config);
            newForm.style.opacity = '0';
            newForm.style.display = 'block';
            if (this.container.children.length > 0) {
                const oldForm = this.container.children[0];
                oldForm.style.opacity = '0';
                // Wait for fade out animation
                yield new Promise(resolve => setTimeout(resolve, 300));
                this.container.removeChild(oldForm);
            }
            this.container.appendChild(newForm);
            // Force reflow
            newForm.offsetHeight;
            newForm.style.opacity = '1';
            this.setupFormValidation(formType);
            this.currentForm = formType;
        });
    }
    setupFormValidation(formType) {
        const form = document.getElementById(formType === 'login' ? 'loginForm' : 'registerForm');
        if (!form)
            return;
        form.addEventListener('submit', (e) => this.handleSubmit(e, formType));
        if (formType === 'register') {
            const confirmPassword = document.getElementById('confirmPassword');
            if (confirmPassword) {
                confirmPassword.addEventListener('input', this.handleConfirmPasswordInput);
            }
        }
    }
    handleSubmit(e, formType) {
        e.preventDefault();
        const form = e.target;
        const isValid = this.validateForm(form, formType);
        if (isValid) {
            console.log(`${formType} successful`);
            const username = document.getElementById('username').value;
            const password = document.getElementById('registerPassword').value;
            const authManager = AuthManager.getInstance();
            if (authManager.register(username, password)) {
                window.location.href = 'index.html';
            }
        }
    }
    validateForm(form, formType) {
        var _a, _b, _c;
        let isValid = true;
        // Reset all errors
        const errorElements = form.getElementsByClassName('error-message');
        Array.from(errorElements).forEach((el) => {
            el.style.display = 'none';
        });
        // Email validation
        const emailId = formType === 'login' ? 'loginEmail' : 'registerEmail';
        const email = (_a = document.getElementById(emailId)) === null || _a === void 0 ? void 0 : _a.value;
        if (!this.validateEmail(email)) {
            this.showError(emailId, 'Please enter a valid email address');
            isValid = false;
        }
        // Password validation
        const passwordId = formType === 'login' ? 'loginPassword' : 'registerPassword';
        const password = (_b = document.getElementById(passwordId)) === null || _b === void 0 ? void 0 : _b.value;
        if (!this.validatePassword(password)) {
            this.showError(passwordId, 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character');
            isValid = false;
        }
        // Additional register form validation
        if (formType === 'register') {
            const confirmPassword = (_c = document.getElementById('confirmPassword')) === null || _c === void 0 ? void 0 : _c.value;
            if (password !== confirmPassword) {
                this.showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
        }
        return isValid;
    }
    showError(elementId, message) {
        const errorElement = document.getElementById(`${elementId}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    hideError(elementId) {
        const errorElement = document.getElementById(`${elementId}Error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
    }
    validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    }
}
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.className = 'container';
    document.body.appendChild(formContainer);
    // Initialize form generator
    const formGenerator = new FormGenerator('formContainer');
    formGenerator.switchForm('register'); // Show register form initially
    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            var _a;
            formGenerator.switchForm((_a = button.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase());
        });
    });
});
