package gwiazdki.model;

public class Point {
	private double x;
	private double y;
	
	private Point() {
		this.x = 0;
		this.y = 0;
	}

	public double getX() {
		return x;
	}

	public Point setX(double x) {
		this.x = x;
		return this;
	}

	public double getY() {
		return y;
	}

	public Point setY(double y) {
		this.y = y;
		return this;
	}

	public static Point create() {
		return new Point();
	}
}
