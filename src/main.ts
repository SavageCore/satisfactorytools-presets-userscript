// Userscript offering a dropdown menu on the Satisfactory tools production page to select different calculator presets? Like You'd name them "Main Save", "Multiplayer with that buddy", "Another mp save"
// etc so that the built factory setups can be switched quickly without having to manually change all the numbers each time.

// There's `production1` in localStorage that looks like: [{"metadata":{"name":"Copper Factory (Wire, Cable, Copper Sheet)","icon":"Desc_CopperIngot_C","schemaVersion":1,"gameVersion":"0"},"request":{"allowedAlternateRecipes":[],"blockedRecipes":[],"blockedMachines":[],"blockedResources":[],"sinkableResources":[],"production":[{"item":"Desc_Wire_C","type":"perMinute","amount":30,"ratio":100},{"item":"Desc_Cable_C","type":"perMinute","amount":15,"ratio":100},{"item":"Desc_CopperSheet_C","type":"perMinute","amount":15,"ratio":100}],"input":[],"resourceMax":{"Desc_OreIron_C":0,"Desc_OreCopper_C":60,"Desc_Stone_C":0,"Desc_Coal_C":0,"Desc_OreGold_C":0,"Desc_LiquidOil_C":0,"Desc_RawQuartz_C":0,"Desc_Sulfur_C":0,"Desc_OreBauxite_C":0,"Desc_OreUranium_C":0,"Desc_NitrogenGas_C":0,"Desc_SAM_C":0,"Desc_Water_C":0},"resourceWeight":{"Desc_OreIron_C":1,"Desc_OreCopper_C":2.4959349593495936,"Desc_Stone_C":1.3175965665236051,"Desc_Coal_C":2.1773049645390072,"Desc_OreGold_C":6.140000000000001,"Desc_LiquidOil_C":7.30952380952381,"Desc_RawQuartz_C":6.822222222222222,"Desc_Sulfur_C":8.527777777777779,"Desc_OreBauxite_C":7.487804878048781,"Desc_OreUranium_C":43.85714285714286,"Desc_NitrogenGas_C":7.675000000000001,"Desc_SAM_C":9.029411764705882,"Desc_Water_C":0}}},{"metadata":{"name":"Concrete","icon":null,"schemaVersion":1,"gameVersion":"0"},"request":{"allowedAlternateRecipes":[],"blockedRecipes":[],"blockedMachines":[],"blockedResources":[],"sinkableResources":[],"production":[{"item":"Desc_Cement_C","type":"max","amount":10,"ratio":100}],"input":[],"resourceMax":{"Desc_OreIron_C":0,"Desc_OreCopper_C":0,"Desc_Stone_C":120,"Desc_Coal_C":0,"Desc_OreGold_C":0,"Desc_LiquidOil_C":0,"Desc_RawQuartz_C":0,"Desc_Sulfur_C":0,"Desc_OreBauxite_C":0,"Desc_OreUranium_C":0,"Desc_NitrogenGas_C":0,"Desc_SAM_C":0,"Desc_Water_C":0},"resourceWeight":{"Desc_OreIron_C":1,"Desc_OreCopper_C":2.4959349593495936,"Desc_Stone_C":1.3175965665236051,"Desc_Coal_C":2.1773049645390072,"Desc_OreGold_C":6.140000000000001,"Desc_LiquidOil_C":7.30952380952381,"Desc_RawQuartz_C":6.822222222222222,"Desc_Sulfur_C":8.527777777777779,"Desc_OreBauxite_C":7.487804878048781,"Desc_OreUranium_C":43.85714285714286,"Desc_NitrogenGas_C":7.675000000000001,"Desc_SAM_C":9.029411764705882,"Desc_Water_C":0}}},{"metadata":{"name":"Quartz","icon":null,"schemaVersion":1,"gameVersion":"0"},"request":{"allowedAlternateRecipes":[],"blockedRecipes":[],"blockedMachines":[],"blockedResources":[],"sinkableResources":[],"production":[{"item":"Desc_Silica_C","type":"max","amount":20,"ratio":100},{"item":"Desc_QuartzCrystal_C","type":"perMinute","amount":36,"ratio":100}],"input":[],"resourceMax":{"Desc_OreIron_C":0,"Desc_OreCopper_C":0,"Desc_Stone_C":0,"Desc_Coal_C":0,"Desc_OreGold_C":0,"Desc_LiquidOil_C":0,"Desc_RawQuartz_C":120,"Desc_Sulfur_C":0,"Desc_OreBauxite_C":0,"Desc_OreUranium_C":0,"Desc_NitrogenGas_C":0,"Desc_SAM_C":0,"Desc_Water_C":0},"resourceWeight":{"Desc_OreIron_C":1,"Desc_OreCopper_C":2.4959349593495936,"Desc_Stone_C":1.3175965665236051,"Desc_Coal_C":2.1773049645390072,"Desc_OreGold_C":6.140000000000001,"Desc_LiquidOil_C":7.30952380952381,"Desc_RawQuartz_C":6.822222222222222,"Desc_Sulfur_C":8.527777777777779,"Desc_OreBauxite_C":7.487804878048781,"Desc_OreUranium_C":43.85714285714286,"Desc_NitrogenGas_C":7.675000000000001,"Desc_SAM_C":9.029411764705882,"Desc_Water_C":0}}},{"metadata":{"name":"Shared: Steel Factory (Steel Beam, Steel Pipe)","icon":"Desc_SteelPlate_C","schemaVersion":1,"gameVersion":"0"},"request":{"allowedAlternateRecipes":[],"blockedRecipes":[],"blockedMachines":[],"blockedResources":[],"sinkableResources":[],"production":[{"item":"Desc_SteelPipe_C","type":"perMinute","amount":20,"ratio":100},{"item":"Desc_SteelPlate_C","type":"perMinute","amount":22.5,"ratio":100}],"input":[],"resourceMax":{"Desc_OreIron_C":120,"Desc_OreCopper_C":0,"Desc_Stone_C":0,"Desc_Coal_C":120,"Desc_OreGold_C":0,"Desc_LiquidOil_C":0,"Desc_RawQuartz_C":0,"Desc_Sulfur_C":0,"Desc_OreBauxite_C":0,"Desc_OreUranium_C":0,"Desc_NitrogenGas_C":0,"Desc_SAM_C":0,"Desc_Water_C":0},"resourceWeight":{"Desc_OreIron_C":1,"Desc_OreCopper_C":2.4959349593495936,"Desc_Stone_C"
// So we copy/replace that to quickly load different production setups.

// The page is asynchronously loaded, so we may need to wait for the relevant elements to appear.
// Use a MutationObserver to detect when <h2>Production</h2> is added to the DOM.

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
    presetDisplay: `
        font-size: 14px;
        color: #EBEBEB;
        margin-top: 8px;
        margin-bottom: 16px;
        padding: 8px 12px;
        background-color: #4e5d6c;
        border-radius: 4px;
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

const _updatePresetDisplay = () => {
    const existingDisplay = document.getElementById('sc-current-preset-display');
    if (existingDisplay) {
        if (_currentPresetName) {
            existingDisplay.textContent = `Current Preset: ${_currentPresetName}`;
        } else {
            existingDisplay.remove();
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
    onConfirm: () => void;
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
        confirmButton.textContent = 'Delete';
        confirmButton.className = 'btn btn-danger d-block w-100 mb-2';
        confirmButton.addEventListener('click', () => {
            options.onConfirm();
            closeModal();
        });
        modalContent.appendChild(confirmButton);
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

const main = async () => {
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

    // Clone the button to create a new one for saving the current preset
    const savePresetButton = addNewProductionLineButton.cloneNode(true) as HTMLAnchorElement;
    savePresetButton.title = 'Save production preset';
    savePresetButton.innerText = 'Save Preset';
    savePresetButton.className = 'btn btn-warning';
    buttonContainer.appendChild(savePresetButton);

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
                _updatePresetDisplay();
            },
        });
    });

    // Button to load presets
    const loadPresetButton = addNewProductionLineButton.cloneNode(true) as HTMLAnchorElement;
    loadPresetButton.title = 'Load production preset';
    loadPresetButton.innerText = 'Load Preset';
    loadPresetButton.className = 'btn btn-info';
    buttonContainer.appendChild(loadPresetButton);

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
                    _currentPresetName = p.name;
                    localStorage.setItem('sc_currentPresetName', p.name);
                    localStorage.setItem('production1', JSON.stringify(p.data));
                    location.reload();
                }
            },
        });
    });

    // Button to delete preset
    const deletePresetButton = addNewProductionLineButton.cloneNode(true) as HTMLAnchorElement;
    deletePresetButton.title = 'Delete production preset';
    deletePresetButton.innerText = 'Delete Preset';
    deletePresetButton.className = 'btn btn-danger';
    buttonContainer.appendChild(deletePresetButton);
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
};

const observer = new MutationObserver((mutations, obs) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement && node.tagName === 'H2' && node.innerText === 'Production') {
                // Stop observing once the target element is found
                main();

                // Display current preset name under the Production heading
                const presetDisplay = document.createElement('div');
                presetDisplay.id = 'sc-current-preset-display';
                presetDisplay.style.cssText = _styles.presetDisplay;
                if (_currentPresetName) {
                    presetDisplay.textContent = `Current Preset: ${_currentPresetName}`;
                    (node as HTMLElement).insertAdjacentElement('afterend', presetDisplay);
                } else {
                    presetDisplay.style.display = 'none';
                    (node as HTMLElement).insertAdjacentElement('afterend', presetDisplay);
                }

                obs.disconnect();
                return;
            }
        }
    }
});

// Start observing the document body for added nodes
observer.observe(document.body, { childList: true, subtree: true });