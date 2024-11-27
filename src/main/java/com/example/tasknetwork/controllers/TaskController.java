package com.example.tasknetwork.controllers;

import com.example.tasknetwork.models.Link;
import com.example.tasknetwork.models.Sector;
import com.example.tasknetwork.models.Task;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Permitir acesso de qualquer origem
public class TaskController {

    private final List<Sector> sectors = new ArrayList<>();
    private final List<Link> links = new ArrayList<>();

    public TaskController() {
        // Setores e Links iniciais
        sectors.add(new Sector("Administração"));
        sectors.add(new Sector("TI"));

        links.add(new Link("Google", "https://www.google.com"));
        links.add(new Link("GitHub", "https://www.github.com"));
    }

    // Gerenciamento de Setores
    @GetMapping("/sectors")
    public List<Sector> getAllSectors() {
        return sectors;
    }

    @PostMapping("/sectors")
    public ResponseEntity<?> addSector(@RequestBody Sector sector) {
        if (sector.getName() == null || sector.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("O nome do setor não pode ser vazio.");
        }

        for (Sector existingSector : sectors) {
            if (existingSector.getName().equalsIgnoreCase(sector.getName())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Já existe um setor com este nome.");
            }
        }

        sectors.add(sector);
        return ResponseEntity.ok(sector);
    }

    @DeleteMapping("/sectors/{sectorName}")
    public ResponseEntity<?> deleteSector(@PathVariable String sectorName) {
        boolean removed = sectors.removeIf(sector -> sector.getName().equalsIgnoreCase(sectorName));
        if (removed) {
            return ResponseEntity.ok("Setor removido com sucesso.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Setor não encontrado.");
    }

    @DeleteMapping("/sectors/{sectorName}/tasks")
    public ResponseEntity<?> deleteAllTasksFromSector(@PathVariable String sectorName) {
        for (Sector sector : sectors) {
            if (sector.getName().equalsIgnoreCase(sectorName)) {
                sector.getTasks().clear();
                return ResponseEntity.ok("Todas as tarefas do setor foram removidas.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Setor não encontrado.");
    }

    @PostMapping("/sectors/{sectorName}/tasks")
    public ResponseEntity<?> addTaskToSector(@PathVariable String sectorName, @RequestBody Task task) {
        for (Sector sector : sectors) {
            if (sector.getName().equalsIgnoreCase(sectorName)) {
                sector.getTasks().add(task);
                return ResponseEntity.ok(task);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Setor não encontrado.");
    }

    @DeleteMapping("/sectors/{sectorName}/tasks/{taskTitle}")
    public ResponseEntity<?> deleteTaskFromSector(@PathVariable String sectorName, @PathVariable String taskTitle) {
        for (Sector sector : sectors) {
            if (sector.getName().equalsIgnoreCase(sectorName)) {
                boolean removed = sector.getTasks()
                        .removeIf(task -> task.getTitle().equalsIgnoreCase(taskTitle));
                if (removed) {
                    return ResponseEntity.ok("Tarefa removida com sucesso.");
                }
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Tarefa não encontrada.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Setor não encontrado.");
    }

    @GetMapping("/sectors/tasks")
    public List<Sector> getAllSectorsWithTasks() {
        return sectors;
    }

    @GetMapping("/tasks/search")
    public List<Task> searchTasks(@RequestParam String query) {
        List<Task> matchedTasks = new ArrayList<>();
        for (Sector sector : sectors) {
            for (Task task : sector.getTasks()) {
                if (task.getTitle().toLowerCase().contains(query.toLowerCase())) {
                    matchedTasks.add(task);
                }
            }
        }
        return matchedTasks;
    }

    // Gerenciamento de Links
    @GetMapping("/links")
    public List<Link> getAllLinks() {
        return links;
    }

    @PostMapping("/links")
    public ResponseEntity<?> addLink(@RequestBody Link link) {
        if (link.getName() == null || link.getName().isEmpty() || link.getUrl() == null || link.getUrl().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Nome e URL do link não podem ser vazios.");
        }

        for (Link existingLink : links) {
            if (existingLink.getName().equalsIgnoreCase(link.getName())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Já existe um link com este nome.");
            }
        }

        links.add(link);
        return ResponseEntity.ok(link);
    }

    @DeleteMapping("/links/{index}")
    public ResponseEntity<?> deleteLink(@PathVariable int index) {
        if (index >= 0 && index < links.size()) {
            links.remove(index);
            return ResponseEntity.ok("Link removido com sucesso.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Link não encontrado.");
    }

    @DeleteMapping("/links")
    public ResponseEntity<?> deleteAllLinks() {
        links.clear();
        return ResponseEntity.ok("Todos os links foram removidos.");
    }
}
