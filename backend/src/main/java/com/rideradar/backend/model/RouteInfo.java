package com.rideradar.backend.model;

public class RouteInfo {

    private double distance;
    private int duration;

    public RouteInfo(
            double distance,
            int duration
    ) {
        this.distance = distance;
        this.duration = duration;
    }

    public double getDistance() {
        return distance;
    }

    public int getDuration() {
        return duration;
    }
}