package upwm.fractals;

import java.util.Collections;
import java.util.List;

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
//			z = z.sqr().add(p);
			z = z.sqrPlus(p);
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

	@Override
	public boolean hasParams() {
		return false;
	}

	@Override
	public List<String> getAvailableParams() {
		return Collections.emptyList();
	}

	@Override
	public void setParamValue(String name, Complex c) {

	}
}
