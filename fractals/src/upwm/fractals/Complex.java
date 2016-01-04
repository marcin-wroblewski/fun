package upwm.fractals;

public class Complex {
	public static final Complex ZERO = new Complex(0.0, 0.0);
	private double re;
	private double im;
	
	public Complex(double re, double im) {
		super();
		this.re = re;
		this.im = im;
	}

	public Complex add(Complex other) {
		return new Complex(this.re + other.re, this.im + other.im);
	}

	public Complex mult(Complex other) {
		return new Complex(this.re * other.re - this.im * other.im, this.re * other.im + this.im * other.re);
	}

	public Complex sqr() {
		return mult(this);
	}

	public Complex copy() {
		return new Complex(this.re, this.im);
	}

	public Double modulus() {
		return Math.sqrt(this.re * this.re + this.im * this.im);
	}

	public Double modulusSqr() {
		return this.re * this.re + this.im * this.im;
	}

	@Override
	public String toString() {
		return String.format("%s+%si", re,im);
	}
	

}
