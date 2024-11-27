package com.example.tasknetwork.models;

import java.util.ArrayList;
import java.util.List;

public class Task {
    private String title;
    private List<String> observations;

    public Task(String title) {
        this.title = title;
        this.observations = new ArrayList<>();
    }

    // Getters e Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getObservations() {
        return observations;
    }

    public void setObservations(List<String> observations) {
        this.observations = observations;
    }
}
