const _version = '0.0.0';
const _githubRepoUrl = 'https://github.com/SavageCore/satisfactorytools-presets-userscript';

const _styles = {
    backdrop: `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `,
    content: `
        background-color: #2b3e50;
        border-radius: 8px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `,
    title: `margin-top: 0; margin-bottom: 16px; font-size: 20px; color: #EBEBEB;`,
    list: `display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;`,
    presetPanel: `
        margin-top: 16px;
        margin-bottom: 16px;
        padding: 16px;
        background: #4E5D6C;
        border-radius: 0px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
    `,
    presetPanelTitle: `
        margin-top: 0;
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #EBEBEB;
    `,
    presetDisplay: `
        font-size: 14px;
        color: #EBEBEB;
        margin-bottom: 12px;
        padding: 8px 12px;
        background-color: rgba(43, 62, 80, 1);
        border-radius: 4px;
        border-left: 2px solid #df691a;
    `,
    presetButtonGroup: `
        display: flex;
        flex-direction: row;
        gap: 6px;
        justify-content: flex-start;
        margin-bottom: 12px;
        width: 100%;
        flex-wrap: wrap;
    `,
    presetButton: `
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        color: white;
        flex: 0 1 auto;
    `,
    presetFooter: `
        padding-top: 8px;
        border-top: 1px solid rgba(43, 62, 80, 0.4);
        font-size: 11px;
        color: #a8c0cf;
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        flex-wrap: wrap;
    `,
    presetFooterLink: `
        color: #df691a;
        text-decoration: none;
        transition: color 0.2s ease;
    `,
    textInput: `
        width: 100%;
        padding: 10px 12px;
        margin-bottom: 16px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 14px;
        box-sizing: border-box;
    `
};

let _currentPresetName = localStorage.getItem('sc_currentPresetName') || '';
let _presetPanelElement: HTMLElement | null = null;
let _hasUnsavedChanges = false;
let _isMonitoring = false;
let _stabilizationTimer: number | null = null;
let _pageLoaded = false;

const _startMonitoring = () => {
    _isMonitoring = true;
};

const _checkForChanges = () => {
    // Only track changes after the page has fully loaded and stabilized
    if (!_isMonitoring) {
        // If page is loaded but not yet monitoring, reset the stabilization timer
        if (_pageLoaded) {
            if (_stabilizationTimer !== null) {
                window.clearTimeout(_stabilizationTimer);
            }
            // Wait 1 second after last change before starting to monitor
            _stabilizationTimer = window.setTimeout(() => {
                _startMonitoring();
            }, 1000);
        }
        return;
    }

    // Mark as having unsaved changes when production1 is modified
    _hasUnsavedChanges = true;
};

const _createPresetPanel = () => {
    const panel = document.createElement('div');
    panel.id = 'sc-preset-panel';
    panel.className = 'container-fluid';
    panel.style.cssText = _styles.presetPanel;

    // Title row
    const titleRow = document.createElement('div');
    titleRow.className = 'row mb-2';
    const titleCol = document.createElement('div');
    titleCol.className = 'col-12';
    const title = document.createElement('h3');
    title.textContent = 'Satisfactory Tools Presets';
    title.style.cssText = _styles.presetPanelTitle;
    titleCol.appendChild(title);
    titleRow.appendChild(titleCol);
    panel.appendChild(titleRow);

    // Display row
    const displayRow = document.createElement('div');
    displayRow.className = 'row mb-2';
    const displayCol = document.createElement('div');
    displayCol.className = 'col-12';
    const display = document.createElement('div');
    display.id = 'sc-current-preset-display';
    display.style.cssText = _styles.presetDisplay;
    if (_currentPresetName) {
        display.textContent = `Selected preset: ${_currentPresetName}`;
    } else {
        display.textContent = 'No preset loaded';
    }
    displayCol.appendChild(display);
    displayRow.appendChild(displayCol);
    panel.appendChild(displayRow);

    // Button row
    const buttonRow = document.createElement('div');
    buttonRow.className = 'row mb-2';
    const buttonCol = document.createElement('div');
    buttonCol.className = 'col-12';
    const buttonGroup = document.createElement('div');
    buttonGroup.style.cssText = _styles.presetButtonGroup;
    buttonCol.appendChild(buttonGroup);
    buttonRow.appendChild(buttonCol);
    panel.appendChild(buttonRow);

    // Footer row
    const footerRow = document.createElement('div');
    footerRow.className = 'row';
    const footerCol = document.createElement('div');
    footerCol.className = 'col-12';
    const footer = document.createElement('div');
    footer.style.cssText = _styles.presetFooter;

    const versionSpan = document.createElement('span');
    versionSpan.textContent = `v${_version}`;
    footer.appendChild(versionSpan);

    const githubLink = document.createElement('a');
    githubLink.href = _githubRepoUrl;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.textContent = 'GitHub';
    githubLink.style.cssText = _styles.presetFooterLink;
    footer.appendChild(githubLink);

    footerCol.appendChild(footer);
    footerRow.appendChild(footerCol);
    panel.appendChild(footerRow);

    _presetPanelElement = panel;
    return panel;
};

const _updatePresetDisplay = () => {
    const existingDisplay = document.getElementById('sc-current-preset-display');
    if (existingDisplay) {
        if (_currentPresetName) {
            existingDisplay.textContent = `Current: ${_currentPresetName}`;
        } else {
            existingDisplay.textContent = 'No preset loaded';
        }
    }
};

interface ModalOptions {
    title: string;
    onCancel?: () => void;
}

interface ModalTextInputOptions extends ModalOptions {
    type: 'text-input';
    placeholder?: string;
    initialValue?: string;
    submitButtonText?: string;
    onSubmit: (value: string) => void;
}

interface ModalSelectOptions extends ModalOptions {
    type: 'select';
    items: { label: string; value: unknown }[];
    onSelect: (value: unknown) => void;
}

interface ModalConfirmOptions extends ModalOptions {
    type: 'confirm';
    message: string;
    confirmButtonText?: string;
    confirmButtonClass?: string;
    secondaryButtonText?: string;
    secondaryButtonClass?: string;
    onConfirm: () => void;
    onSecondary?: () => void;
}

const _createModal = (options: ModalTextInputOptions | ModalSelectOptions | ModalConfirmOptions) => {
    const modal = document.createElement('div');
    modal.style.cssText = _styles.backdrop;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = _styles.content;

    const title = document.createElement('h2');
    title.textContent = options.title;
    title.style.cssText = _styles.title;
    modalContent.appendChild(title);

    const closeModal = () => {
        document.body.removeChild(modal);
    };

    if (options.type === 'text-input') {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = options.placeholder || '';
        input.value = options.initialValue || '';
        input.style.cssText = _styles.textInput;
        modalContent.appendChild(input);

        const submitButton = document.createElement('button');
        submitButton.textContent = options.submitButtonText || 'Save';
        submitButton.className = 'btn btn-success d-block w-100 mb-2';
        submitButton.addEventListener('click', () => {
            if (input.value.trim()) {
                options.onSubmit(input.value.trim());
                closeModal();
            }
        });
        modalContent.appendChild(submitButton);

        // Allow Enter key to submit
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                options.onSubmit(input.value.trim());
                closeModal();
            }
        });

        // Focus the input for convenience
        input.focus();
        input.select();
    } else if (options.type === 'select') {
        const itemList = document.createElement('div');
        itemList.style.cssText = _styles.list;

        for (const item of options.items) {
            const button = document.createElement('button');
            button.textContent = item.label;
            if (item.label === '+ New Preset') {
                button.className = 'btn btn-success d-block w-100 mb-2';
            } else {
                button.className = 'btn btn-info d-block w-100 mb-2';
            }
            button.addEventListener('click', () => {
                options.onSelect(item.value);
                closeModal();
            });
            itemList.appendChild(button);
        }

        modalContent.appendChild(itemList);
    } else if (options.type === 'confirm') {
        const message = document.createElement('p');
        message.textContent = options.message;
        modalContent.appendChild(message);

        const confirmButton = document.createElement('button');
        confirmButton.textContent = options.confirmButtonText || 'Delete';
        confirmButton.className = options.confirmButtonClass || 'btn btn-danger d-block w-100 mb-2';
        confirmButton.addEventListener('click', () => {
            options.onConfirm();
            closeModal();
        });
        modalContent.appendChild(confirmButton);

        // Add secondary button if provided
        if (options.secondaryButtonText && options.onSecondary) {
            const secondaryButton = document.createElement('button');
            secondaryButton.textContent = options.secondaryButtonText;
            secondaryButton.className = options.secondaryButtonClass || 'btn btn-info d-block w-100 mb-2';
            secondaryButton.addEventListener('click', () => {
                options.onSecondary!();
                closeModal();
            });
            modalContent.appendChild(secondaryButton);
        }
    }

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = options.type === 'confirm' ? 'btn btn-warning d-block w-100' : 'btn btn-danger d-block w-100';
    cancelButton.addEventListener('click', () => {
        options.onCancel?.();
        closeModal();
    });
    modalContent.appendChild(cancelButton);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

const main = () => {
    // <a class="nav-link align-self-center" ng-click="ctrl.addEmptyTab();" title="" tooltip="" data-original-title="Add new production line" aria-describedby="tooltip244961"><span ng-class="{'fas': true, 'fa-plus': !ctrl.addingInProgress, 'fa-spin': ctrl.addingInProgress, 'fa-sync-alt': ctrl.addingInProgress}" class="fas fa-plus"></span></a>
    const addNewProductionLineButton = document.querySelector<HTMLAnchorElement>('a.nav-link[title="Add new production line"]');
    if (!addNewProductionLineButton) {
        console.error('Add new production line button not found');
        return;
    }

    const buttonContainer = addNewProductionLineButton.parentElement;
    if (!buttonContainer) {
        console.error('Button container not found');
        return;
    }

    // Create the preset panel and get the button group
    const presetPanel = _createPresetPanel();
    const buttonGroup = presetPanel.querySelector('div.row.mb-2:nth-of-type(3) > div > div') as HTMLElement;

    // Create Save Preset button
    const savePresetButton = document.createElement('button');
    savePresetButton.innerHTML = '<span class="fas fa-fw fa-save"></span>';
    savePresetButton.title = 'Save current production setup as a preset';
    savePresetButton.className = 'btn btn-success';
    savePresetButton.style.cssText = _styles.presetButton;
    buttonGroup.appendChild(savePresetButton);

    savePresetButton.addEventListener('click', () => {
        // Gather current production setup data
        const productionData = localStorage.getItem('production1');
        if (!productionData) {
            console.error('No production data found in localStorage');
            return;
        }

        _createModal({
            type: 'text-input',
            title: 'Save Production Preset',
            placeholder: 'Enter preset name...',
            initialValue: _currentPresetName,
            submitButtonText: _currentPresetName ? 'Update' : 'Save',
            onSubmit: (presetName: string) => {
                const preset = { name: presetName, data: JSON.parse(productionData) };
                const savedPresets = JSON.parse(localStorage.getItem('sc_productionPresets') || '[]');

                // If we have a current preset name, update that preset instead of creating new
                if (_currentPresetName) {
                    const index = savedPresets.findIndex((p: any) => p.name === _currentPresetName);
                    if (index !== -1) {
                        savedPresets[index] = preset;
                    } else {
                        savedPresets.push(preset);
                    }
                } else {
                    savedPresets.push(preset);
                }

                localStorage.setItem('sc_productionPresets', JSON.stringify(savedPresets));
                _currentPresetName = presetName;
                localStorage.setItem('sc_currentPresetName', presetName);
                _hasUnsavedChanges = false;
                _updatePresetDisplay();
            },
        });
    });

    // Create Load Preset button
    const loadPresetButton = document.createElement('button');
    loadPresetButton.innerHTML = '<span class="fas fa-fw fa-folder-open"></span>';
    loadPresetButton.className = 'btn btn-info';
    loadPresetButton.title = 'Load a saved production preset';
    loadPresetButton.style.cssText = _styles.presetButton;
    buttonGroup.appendChild(loadPresetButton);

    loadPresetButton.addEventListener('click', () => {
        const savedPresets = JSON.parse(localStorage.getItem('sc_productionPresets') || '[]');

        // Create items list with "New" option at the top, followed by existing presets
        const items = [
            { label: '+ New Preset', value: 'new' },
            ...savedPresets.map((preset: any) => ({ label: preset.name, value: preset })),
        ];

        _createModal({
            type: 'select',
            title: 'Load Production Preset',
            items: items,
            onSelect: (value: unknown) => {
                if (value === 'new') {
                    // Show text input modal for new preset name
                    const productionData = localStorage.getItem('production1');
                    if (!productionData) {
                        alert('No production data found in localStorage');
                        return;
                    }

                    _createModal({
                        type: 'text-input',
                        title: 'Create New Preset',
                        placeholder: 'Enter new preset name...',
                        initialValue: '',
                        onSubmit: (presetName: string) => {
                            const preset = { name: presetName, data: JSON.parse(productionData) };
                            const savedPresets = JSON.parse(localStorage.getItem('sc_productionPresets') || '[]');
                            savedPresets.push(preset);
                            localStorage.setItem('sc_productionPresets', JSON.stringify(savedPresets));
                            _currentPresetName = presetName;
                            localStorage.setItem('sc_currentPresetName', presetName);
                            location.reload();
                        },
                    });
                } else {
                    const p = value as { name: string; data: unknown };

                    // Function to actually load the preset
                    const loadPreset = () => {
                        _currentPresetName = p.name;
                        localStorage.setItem('sc_currentPresetName', p.name);
                        localStorage.setItem('production1', JSON.stringify(p.data));
                        _hasUnsavedChanges = false;
                        location.reload();
                    };

                    // Check if there are unsaved changes
                    if (_hasUnsavedChanges && _currentPresetName) {
                        _createModal({
                            type: 'confirm',
                            title: 'Save Changes?',
                            message: `You have unsaved changes to "${_currentPresetName}". Do you want to save before loading "${p.name}"?`,
                            confirmButtonText: 'Save & Load',
                            confirmButtonClass: 'btn btn-success d-block w-100 mb-2',
                            secondaryButtonText: 'Discard & Load',
                            secondaryButtonClass: 'btn btn-danger d-block w-100 mb-2',
                            onConfirm: () => {
                                // Save current preset
                                const productionData = localStorage.getItem('production1');
                                if (productionData) {
                                    const preset = { name: _currentPresetName, data: JSON.parse(productionData) };
                                    const savedPresets = JSON.parse(localStorage.getItem('sc_productionPresets') || '[]');
                                    const index = savedPresets.findIndex((sp: any) => sp.name === _currentPresetName);
                                    if (index !== -1) {
                                        savedPresets[index] = preset;
                                        localStorage.setItem('sc_productionPresets', JSON.stringify(savedPresets));
                                    }
                                }
                                // Now load the new preset
                                loadPreset();
                            },
                            onSecondary: () => {
                                // Discard changes and load new preset
                                loadPreset();
                            },
                            onCancel: () => {
                                // Do nothing
                                return;
                            },
                        });
                    } else {
                        // No unsaved changes, just load the preset
                        loadPreset();
                    }
                }
            },
        });
    });

    // Create Delete Preset button
    const deletePresetButton = document.createElement('button');
    deletePresetButton.innerHTML = '<span class="fas fa-fw fa-trash-alt"></span>';
    deletePresetButton.className = 'btn btn-danger';
    deletePresetButton.title = 'Delete a saved production preset';
    deletePresetButton.style.cssText = _styles.presetButton;
    buttonGroup.appendChild(deletePresetButton);

    deletePresetButton.addEventListener('click', () => {
        const savedPresets = JSON.parse(localStorage.getItem('sc_productionPresets') || '[]');
        if (savedPresets.length === 0) {
            alert('No saved presets found.');
            return;
        }
        _createModal({
            type: 'select',
            title: 'Delete Production Preset',
            items: savedPresets.map((preset: any) => ({ label: preset.name, value: preset })),
            onSelect: (preset: unknown) => {
                const p = preset as { name: string; data: unknown };
                _createModal({
                    type: 'confirm',
                    title: 'Confirm Delete',
                    message: `Are you sure you want to delete "${p.name}"?`,
                    onConfirm: () => {
                        const deletedIndex = savedPresets.findIndex((sp: any) => sp.name === p.name);
                        const updatedPresets = savedPresets.filter((sp: any) => sp.name !== p.name);
                        localStorage.setItem('sc_productionPresets', JSON.stringify(updatedPresets));

                        // If we deleted the current preset, load the one before it (or the last one if deleting the first)
                        if (_currentPresetName === p.name) {
                            if (deletedIndex > 0 && updatedPresets.length > 0) {
                                // Load the preset that was before the deleted one
                                const presetToLoad = updatedPresets[deletedIndex - 1];
                                _currentPresetName = presetToLoad.name;
                                localStorage.setItem('sc_currentPresetName', presetToLoad.name);
                                localStorage.setItem('production1', JSON.stringify(presetToLoad.data));
                            } else if (updatedPresets.length > 0) {
                                // Load the first preset if we deleted the first one
                                const presetToLoad = updatedPresets[0];
                                _currentPresetName = presetToLoad.name;
                                localStorage.setItem('sc_currentPresetName', presetToLoad.name);
                                localStorage.setItem('production1', JSON.stringify(presetToLoad.data));
                            } else {
                                // No presets left
                                _currentPresetName = '';
                                localStorage.removeItem('sc_currentPresetName');
                            }
                        }

                        location.reload();
                    },
                });
            },
        });
    });

    // Return the preset panel to be inserted into the DOM
    return presetPanel;
};

const observer = new MutationObserver((mutations, obs) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            // Check if the visualization node has been added (indicates page is fully loaded)
            if ((node as HTMLElement).querySelector?.('visualization')) {
                // Now find the Production H2 heading to insert our panel after it
                const productionHeading = document.querySelector('h2');
                if (productionHeading && productionHeading.innerText === 'Production') {
                    const presetPanel = main();

                    // Insert the preset panel right after the Production heading
                    if (presetPanel) {
                        productionHeading.insertAdjacentElement('afterend', presetPanel);

                        // Mark page as loaded and let stabilization timer start
                        _pageLoaded = true;
                    }

                    obs.disconnect();
                    return;
                }
            }
        }
    }
});

// Intercept localStorage.setItem to detect changes to production1
const _originalSetItem = localStorage.setItem;
localStorage.setItem = function (this: Storage, key: string, value: string) {
    _originalSetItem.call(this, key, value);
    if (key === 'production1') {
        _checkForChanges();
    }
} as any;

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });