const API_URL = 'http://localhost:8080/api';

// Adicionar setor
async function addSector() {
    const sectorName = document.getElementById('sector-name').value;
    if (!sectorName) {
        alert('Por favor, insira o nome do setor.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/sectors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: sectorName }),
        });

        if (!response.ok) {
            alert('Erro ao adicionar setor.');
            return;
        }

        alert('Setor adicionado com sucesso!');
        document.getElementById('sector-name').value = '';
        loadSectors();
    } catch (error) {
        console.error('Erro ao adicionar setor:', error);
    }
}

// Carregar setores no dropdown e tabela
async function loadSectors() {
    try {
        const response = await fetch(`${API_URL}/sectors`);
        const sectors = await response.json();

        const sectorSelect = document.getElementById('sector-select');
        const sectorTableBody = document.querySelector('#sector-table tbody');

        if (!sectorSelect || !sectorTableBody) {
            console.error('Elemento DOM não encontrado.');
            return;
        }

        sectorSelect.innerHTML = '<option value="" disabled selected>Selecione um setor</option>';
        sectorTableBody.innerHTML = '';

        sectors.forEach(sector => {
            // Preencher dropdown
            const option = document.createElement('option');
            option.value = sector.name;
            option.textContent = sector.name;
            sectorSelect.appendChild(option);

            // Preencher tabela
            const row = document.createElement('tr');
            const sectorCell = document.createElement('td');
            sectorCell.textContent = sector.name;

            const taskCell = document.createElement('td');
            const taskList = document.createElement('ul');

            sector.tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.title;

                const deleteTaskButton = document.createElement('button');
                deleteTaskButton.textContent = 'Remover Tarefa';
                deleteTaskButton.style.marginLeft = '10px';
                deleteTaskButton.onclick = () => deleteTask(sector.name, task.title);

                taskItem.appendChild(deleteTaskButton);
                taskList.appendChild(taskItem);
            });

            taskCell.appendChild(taskList);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover Setor';
            deleteButton.onclick = () => deleteSector(sector.name);

            actionCell.appendChild(deleteButton);

            row.appendChild(sectorCell);
            row.appendChild(taskCell);
            row.appendChild(actionCell);

            sectorTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar setores:', error);
    }
}

// Remover setor
async function deleteSector(sectorName) {
    try {
        const response = await fetch(`${API_URL}/sectors/${sectorName}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            alert('Erro ao remover setor.');
            return;
        }

        alert(`Setor "${sectorName}" removido com sucesso!`);
        loadSectors(); // Atualiza a lista de setores no dropdown e na tabela
    } catch (error) {
        console.error('Erro ao remover setor:', error);
    }
}

// Remover tarefa específica
async function deleteTask(sectorName, taskTitle) {
    try {
        const response = await fetch(`${API_URL}/sectors/${sectorName}/tasks/${taskTitle}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            alert('Erro ao remover tarefa.');
            return;
        }

        alert(`Tarefa "${taskTitle}" removida com sucesso do setor "${sectorName}"!`);
        loadSectors(); // Atualiza a lista de tarefas
    } catch (error) {
        console.error('Erro ao remover tarefa:', error);
    }
}

// Adicionar tarefa
async function addTask() {
    const taskTitle = document.getElementById('task-title').value;
    const sectorName = document.getElementById('sector-select').value;

    if (!taskTitle || !sectorName) {
        alert('Por favor, preencha o título da tarefa e selecione um setor.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/sectors/${sectorName}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: taskTitle }),
        });

        if (!response.ok) {
            alert('Erro ao adicionar tarefa.');
            return;
        }

        alert('Tarefa adicionada com sucesso!');
        document.getElementById('task-title').value = '';
        loadSectors();
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
}

// Adicionar link
async function addLink() {
    const linkName = document.getElementById('link-name').value;
    const linkUrl = document.getElementById('link-url').value;

    if (!linkName || !linkUrl) {
        alert('Por favor, preencha o nome e o URL do link.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/links`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: linkName, url: linkUrl }),
        });

        if (!response.ok) {
            alert('Erro ao adicionar link.');
            return;
        }

        alert('Link adicionado com sucesso!');
        document.getElementById('link-name').value = '';
        document.getElementById('link-url').value = '';
        loadLinks();
    } catch (error) {
        console.error('Erro ao adicionar link:', error);
    }
}
// Carregar painel de links
async function loadLinkPanel() {
    try {
        const response = await fetch(`${API_URL}/links`);
        const links = await response.json();

        const linkPanel = document.getElementById('link-panel');
        if (!linkPanel) {
            console.error('Elemento DOM "link-panel" não encontrado.');
            return;
        }

        linkPanel.innerHTML = ''; // Limpa o painel antes de adicionar os links

        links.forEach(link => {
            const linkContainer = document.createElement('div');
            linkContainer.style.display = 'flex';
            linkContainer.style.flexDirection = 'column';
            linkContainer.style.alignItems = 'center';
            linkContainer.style.width = '100px';
            linkContainer.style.cursor = 'pointer';

            // Ícone ou representação visual do link
            const icon = document.createElement('div');
            icon.style.width = '50px';
            icon.style.height = '50px';
            icon.style.borderRadius = '50%';
            icon.style.backgroundColor = '#4CAF50';
            icon.style.display = 'flex';
            icon.style.justifyContent = 'center';
            icon.style.alignItems = 'center';
            icon.style.color = 'white';
            icon.style.fontSize = '20px';
            icon.textContent = link.name[0].toUpperCase(); // Primeira letra do nome do link

            // Nome do link
            const name = document.createElement('p');
            name.textContent = link.name;
            name.style.marginTop = '10px';
            name.style.textAlign = 'center';

            // Ação ao clicar no link
            linkContainer.onclick = () => {
                window.open(link.url, '_blank'); // Abre o link em uma nova aba
            };

            linkContainer.appendChild(icon);
            linkContainer.appendChild(name);
            linkPanel.appendChild(linkContainer);
        });
    } catch (error) {
        console.error('Erro ao carregar painel de links:', error);
    }
}
// Carregar links
async function loadLinks() {
    try {
        const response = await fetch(`${API_URL}/links`);
        const links = await response.json();

        const linkTableBody = document.querySelector('#link-table tbody');
        if (!linkTableBody) {
            console.error('Elemento DOM não encontrado.');
            return;
        }

        linkTableBody.innerHTML = '';

        links.forEach((link, index) => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = link.name;

            const urlCell = document.createElement('td');
            const urlLink = document.createElement('a');
            urlLink.href = link.url;
            urlLink.textContent = link.url;
            urlLink.target = '_blank';
            urlCell.appendChild(urlLink);

            const actionCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.onclick = () => deleteLink(index);

            actionCell.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(urlCell);
            row.appendChild(actionCell);

            linkTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar links:', error);
    }
}

// Remover link
async function deleteLink(index) {
    try {
        const response = await fetch(`${API_URL}/links/${index}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            alert('Erro ao remover link.');
            return;
        }

        alert('Link removido com sucesso!');
        loadLinks();
    } catch (error) {
        console.error('Erro ao remover link:', error);
    }
}

function calculateFolga() {
    const workedHours = parseFloat(document.getElementById('worked-hours').value);
    const dayType = document.getElementById('day-type').value;

    if (!workedHours || workedHours <= 0) {
        alert('Por favor, insira um número válido de horas trabalhadas.');
        return;
    }

    if (!dayType) {
        alert('Por favor, selecione o tipo de dia.');
        return;
    }

    let folgas = 0;

    // Cálculo das folgas baseado no tipo de dia
    if (dayType === 'feriado') {
        folgas = workedHours * 2; // 2 horas de folga por cada hora trabalhada
    } else if (dayType === 'sabado') {
        folgas = workedHours * 1.5; // 1.5 horas de folga por cada hora trabalhada
    } else if (dayType === 'domingo') {
        folgas = workedHours * 2; // 2 horas de folga por cada hora trabalhada
    }

    // Atualizar o resultado no HTML
    document.getElementById('total-folgas').textContent = `${folgas.toFixed(2)} horas`;

    // Obter data atual e dia da semana
    const now = new Date();
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);

    // Adicionar os dados no painel de folgas
    addFolgaToTable(workedHours, dayType, folgas.toFixed(2), formattedDate);
}
function addFolgaToTable(workedHours, dayType, folgas, formattedDate) {
    const folgaTableBody = document.querySelector('#folga-table tbody');

    if (!folgaTableBody) {
        console.error('Elemento DOM "folga-table" não encontrado.');
        return;
    }

    const row = document.createElement('tr');

    const workedHoursCell = document.createElement('td');
    workedHoursCell.textContent = workedHours;

    const dayTypeCell = document.createElement('td');
    dayTypeCell.textContent = capitalize(dayType); // Capitaliza o tipo de dia

    const folgasCell = document.createElement('td');
    folgasCell.textContent = `${folgas} horas`;

    const dateCell = document.createElement('td');
    dateCell.textContent = formattedDate; // Data formatada com dia da semana

    row.appendChild(workedHoursCell);
    row.appendChild(dayTypeCell);
    row.appendChild(folgasCell);
    row.appendChild(dateCell);

    folgaTableBody.appendChild(row);
}

// Função para capitalizar o tipo de dia
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Inicialização
window.onload = () => {
    loadSectors();
    loadLinks();
    loadLinkPanel(); // Chamar o mé
};
