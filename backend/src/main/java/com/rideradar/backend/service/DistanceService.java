package com.rideradar.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DistanceService {

    public double calculateDistance(
            String pickup,
            String destination
    ) {

        System.out.println("Calculating distance...");
        System.out.println("Pickup: " + pickup);
        System.out.println("Destination: " + destination);

        // Temporary demo distance
        // Later we will replace this with a real Maps API.
        return 8.5;
    }
}