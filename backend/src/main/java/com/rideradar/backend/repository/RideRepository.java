package com.rideradar.backend.repository;

import com.rideradar.backend.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<Ride, Long> {
}