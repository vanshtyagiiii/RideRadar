package com.rideradar.backend.service;

import com.rideradar.backend.model.Ride;
import com.rideradar.backend.model.RouteInfo;
import com.rideradar.backend.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final DistanceService distanceService;

   public RideService(
        RideRepository rideRepository,
        DistanceService distanceService
) {
    this.rideRepository = rideRepository;
    this.distanceService = distanceService;
}

    public List<Ride> getRides(String pickup, String destination) {

        System.out.println("Service received:");
        System.out.println("Pickup: " + pickup);
        System.out.println("Destination: " + destination);

        List<Ride> rides = rideRepository.findAll();

        // Demo distance calculation
       RouteInfo route =
        distanceService.calculateRoute(
                pickup,
                destination
        );

double distance = route.getDistance();
 for (Ride ride : rides) {
    ride.setDistance(distance);
}

int duration = route.getDuration();

        System.out.println("Estimated distance: " + distance + " km");

     for (Ride ride : rides) {

    ride.setDistance(distance);

    int calculatedPrice =
            calculateFare(
                    ride.getName(),
                    distance
            );
          ride.setPrice(calculatedPrice);

            int providerDuration = calculateProviderDuration(
        ride.getName(),
        duration
);

ride.setTime(providerDuration + " min");
System.out.println(
        ride.getName()
                + " estimated time: "
                + providerDuration
                + " min"
);
            System.out.println(
                    ride.getName()
                            + " estimated fare: ₹"
                            + calculatedPrice
            );
        }

        return rides;
    }

 

    private int calculateFare(
            String provider,
            double distance
    ) {

        double baseFare;
        double perKm;

        if (provider.equalsIgnoreCase("Uber")) {

            baseFare = 50;
            perKm = 18;

        } else if (provider.equalsIgnoreCase("Ola")) {

            baseFare = 45;
            perKm = 17;

        } else {

            baseFare = 40;
            perKm = 15;
        }

        return (int) Math.round(
                baseFare + (distance * perKm)
        );
    }
     private int calculateProviderDuration(
        String provider,
        int baseDuration
) {

    if (provider.equalsIgnoreCase("Uber")) {

        return baseDuration;

    } else if (provider.equalsIgnoreCase("Ola")) {

        return baseDuration + 1;

    } else {

        return Math.max(1, baseDuration - 1);
    }
}
}