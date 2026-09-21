package com.rideradar.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rideradar.backend.model.RouteInfo;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
public class DistanceService {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public DistanceService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

  public RouteInfo calculateRoute(
        String pickup,
        String destination
) {

        try {

            System.out.println("Geocoding locations...");

            // Pickup coordinates
            double[] pickupCoordinates =
                    geocodeLocation(pickup);

            // Destination coordinates
            double[] destinationCoordinates =
                    geocodeLocation(destination);

            System.out.println(
                    "Pickup coordinates: "
                            + pickupCoordinates[1]
                            + ", "
                            + pickupCoordinates[0]
            );

            System.out.println(
                    "Destination coordinates: "
                            + destinationCoordinates[1]
                            + ", "
                            + destinationCoordinates[0]
            );

            // OSRM routing API
            String routeUrl =
                    "https://router.project-osrm.org/route/v1/driving/"
                            + pickupCoordinates[0]
                            + ","
                            + pickupCoordinates[1]
                            + ";"
                            + destinationCoordinates[0]
                            + ","
                            + destinationCoordinates[1]
                            + "?overview=false";

            HttpRequest routeRequest =
                    HttpRequest.newBuilder()
                            .uri(URI.create(routeUrl))
                            .header(
                                    "User-Agent",
                                    "RideRadar/1.0"
                            )
                            .GET()
                            .build();

            HttpResponse<String> routeResponse =
                    httpClient.send(
                            routeRequest,
                            HttpResponse.BodyHandlers.ofString()
                    );

            Map<String, Object> routeData =
                    objectMapper.readValue(
                            routeResponse.body(),
                            new TypeReference<Map<String, Object>>() {}
                    );

            String code =
                    (String) routeData.get("code");

            if (!"Ok".equals(code)) {

                throw new RuntimeException(
                        "Route calculation failed: "
                                + code
                );
            }

            List<Map<String, Object>> routes =
                    (List<Map<String, Object>>)
                            routeData.get("routes");

            Map<String, Object> firstRoute =
                    routes.get(0);

            double distanceInMeters =
                    ((Number) firstRoute.get("distance"))
                            .doubleValue();

            double distanceInKm =
                    distanceInMeters / 1000.0;

                    double durationInSeconds =
        ((Number) firstRoute.get("duration"))
                .doubleValue();

int durationInMinutes =
        (int) Math.round(
                durationInSeconds / 60.0
        );

            System.out.println(
                    "Road distance: "
                            + distanceInKm
                            + " km"
            );
return new RouteInfo(
        Math.round(distanceInKm * 10.0) / 10.0,
        durationInMinutes
);

        } catch (Exception e) {

            System.out.println(
                    "Distance calculation error: "
                            + e.getMessage()
            );

            throw new RuntimeException(
                    "Unable to calculate route distance.",
                    e
            );
        }
    }

    private double[] geocodeLocation(
            String location
    ) throws Exception {

      String searchLocation =
        location + ", Meerut, Uttar Pradesh, India";

String encodedLocation =
        URLEncoder.encode(
                searchLocation,
                StandardCharsets.UTF_8
        );

        String geocodingUrl =
                "https://nominatim.openstreetmap.org/search"
                        + "?q="
                        + encodedLocation
                        + "&format=json"
                        + "&limit=1";

        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(URI.create(geocodingUrl))
                        .header(
                                "User-Agent",
                                "RideRadar/1.0"
                        )
                        .GET()
                        .build();

        HttpResponse<String> response =
                httpClient.send(
                        request,
                        HttpResponse.BodyHandlers.ofString()
                );

        List<Map<String, Object>> results =
                objectMapper.readValue(
                        response.body(),
                        new TypeReference<
                                List<Map<String, Object>>
                                >() {}
                );

        if (results.isEmpty()) {

            throw new RuntimeException(
                    "Location not found: "
                            + location
            );
        }

        double latitude =
                Double.parseDouble(
                        results.get(0)
                                .get("lat")
                                .toString()
                );

        double longitude =
                Double.parseDouble(
                        results.get(0)
                                .get("lon")
                                .toString()
                );

        // longitude first, latitude second
        return new double[]{
                longitude,
                latitude
        };
    }
}