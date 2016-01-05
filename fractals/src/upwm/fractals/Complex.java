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

	public Complex sqrPlus(Complex p) {
		return new Complex(re * re - im * im + p.re, 2 * re * im + p.im);
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
		return String.format("%s+%si", re, im);
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof Complex)) {
			return false;
		}
		Complex other = (Complex) obj;
		return this.re == other.re && this.im == other.im;
	}

	@Override
	public int hashCode() {
		return 13 * Double.hashCode(re) + Double.hashCode(im);
	}
}
