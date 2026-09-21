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
    private double distance;

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
     public void setPrice(int price) {
    this.price = price;
}
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
    this.time = time;
}

    public double getRating() {
        return rating;
    }
public double getDistance() {
    return distance;
}

public void setDistance(double distance) {
    this.distance = distance;
}
    public String getLetter() {
        return letter;
    }
}