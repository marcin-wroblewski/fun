package upwm.fractals;

public class Mandelbrot implements FractalSet {
	private int maxIterations = 60;

	@Override
	public int getMaxIterations() {
		return maxIterations;
	}

	@Override
	public int check(Complex p) {
		int i = 0;
		Complex z = Complex.ZERO;
		while (z.modulusSqr() < 4 && i < maxIterations) {
			z = z.sqr().add(p);
			i++;
		}
		return i;
	}

	@Override
	public String toString() {
		return "Mandelbrot";
	}

	@Override
	public void setMaxIterations(int iterations) {
		this.maxIterations = iterations;
	}
}
