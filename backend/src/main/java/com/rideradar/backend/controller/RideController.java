package com.rideradar.backend.controller;

import com.rideradar.backend.model.Ride;
import com.rideradar.backend.service.RideService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @GetMapping("/api/rides")
    public List<Ride> getRides(
            @RequestParam String pickup,
            @RequestParam String destination
    ) {

        return rideService.getRides(pickup, destination);
    }
}