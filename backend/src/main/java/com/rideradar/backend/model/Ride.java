package com.rideradar.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private int price;
    private String time;
    private double rating;
    private String letter;

    // JPA ke liye default constructor
    public Ride() {
    }

    public Ride(
            Long id,
            String name,
            String type,
            int price,
            String time,
            double rating,
            String letter
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.time = time;
        this.rating = rating;
        this.letter = letter;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public int getPrice() {
        return price;
    }

    public String getTime() {
        return time;
    }

    public double getRating() {
        return rating;
    }

    public String getLetter() {
        return letter;
    }
}