package com.rideradar.backend.service;

import com.rideradar.backend.model.Ride;
import com.rideradar.backend.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;

    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    public List<Ride> getRides(String pickup, String destination) {

        System.out.println("Service received:");
        System.out.println("Pickup: " + pickup);
        System.out.println("Destination: " + destination);

        return rideRepository.findAll();
    }
}