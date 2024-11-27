package com.example.tasknetwork.models;

import java.util.ArrayList;
import java.util.List;

public class Sector {
    private String name;
    private List<Task> tasks;

    public Sector(String name) {
        this.name = name;
        this.tasks = new ArrayList<>();
    }

    // Getters e Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
